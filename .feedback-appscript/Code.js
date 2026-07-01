/**
 * JUST-OS chat feedback receiver.
 * Appends one row per feedback event to the "feedback" sheet.
 *
 * The client POSTs JSON as text/plain (a CORS "simple request") so no
 * preflight is needed. Payload:
 *   { turn_id, rho_exp, signals:{copy,followup,fast_exit}, comment, query, response, ts }
 */

var SHEET_ID = '1unzrmBhMmvHEohIU_B2V9ObcftIluveQA6ZPe6THZpc';
var SHEET_NAME = 'feedback';

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var signals = data.signals || {};
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date(),                 // received_at (server time)
      data.ts || '',              // ts (client epoch ms)
      data.turn_id || '',
      data.rho_exp,               // +1 | -1 | 0
      signals.copy ? 1 : '',
      signals.followup ? 1 : '',
      signals.fast_exit ? 1 : '',
      data.comment || '',
      data.query || '',
      data.response || '',
    ]);

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

// Health check for GET requests.
function doGet() {
  return _json({ ok: true, service: 'just-os-feedback' });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
