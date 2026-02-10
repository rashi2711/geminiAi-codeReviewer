// controllers/ai.controller.js
const reviewService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;

    // 1. Better validation: check existence, type, and non-empty after trim
    if (!code || typeof code !== 'string' || code.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Valid non-empty code string is required',
      });
    }

    // 2. Character limit: Gemini 2.5 series context is large (~1M tokens), but keep safety
    //    15k chars is ~3-4k tokens → reasonable safeguard; adjust if needed
    if (code.length > 15000) {
      return res.status(413).json({
        success: false,
        error: 'Code is too long (max 15,000 characters)',
      });
    }

    // 3. Call service (assuming it returns the review string directly)
    const review = await reviewService(code);

    // 4. Consistent response shape (helps frontend parsing)
    //    Use { success: true, data/review } pattern
    res.status(200).json({
      success: true,
      review,                // ← the markdown-formatted review string
      // Optional: add metadata if useful later
      // generatedAt: new Date().toISOString(),
    });

  } catch (err) {
    console.error('[AI Review Controller Error]', {
      message: err.message,
      stack: err.stack,
      code: req.body.code?.substring(0, 100) + '...', // truncated for logs
    });

    // 5. Use 500 for internal errors (503 is more for temporary service outage)
    //    503 can still be used if you detect rate-limit/quota issues specifically
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI review. Please try again later.',
    });
  }
};