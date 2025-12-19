const PDFDocument = require('pdfkit');
const { Readable } = require('stream');

/**
 * Generate a formatted PDF from project requirements and conversation
 * @param {Object} data - PDF data
 * @param {string} data.requirementsSummary - Final structured summary from AI
 * @param {Array} data.conversationHistory - Full conversation array with role/content
 * @param {string} data.userEmail - User's email address
 * @param {string} data.selectedStage - Selected MVP stage (e.g., "Idea Validation")
 * @returns {Promise<Buffer>} - PDF buffer
 */
async function generateRequirementsPDF({
  requirementsSummary = '',
  conversationHistory = [],
  userEmail = 'Not provided',
  selectedStage = 'Custom Project',
}) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        bufferPages: true,
      });

      let buffers = [];

      // Collect PDF data into buffers
      doc.on('data', (data) => buffers.push(data));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on('error', (err) => reject(err));

      // ============ HEADER ============
      doc.rect(0, 0, doc.page.width, 100).fill('#0085ff');

      doc
        .fontSize(28)
        .fillColor('#ffffff')
        .text('Project Requirements', 50, 25);

      doc
        .fontSize(12)
        .fillColor('#e8f0ff')
        .text('AI Requirements Assistant - Solidev Electrosoft', 50, 60);

      doc
        .fontSize(10)
        .text(`Generated: ${new Date().toLocaleString()}`, 50, 78);

      // Add some space after header
      doc.fillColor('#000000');
      doc.moveTo(50, 110).lineTo(doc.page.width - 50, 110).stroke('#cccccc');
      let yPosition = 130;

      // ============ PROJECT STAGE SECTION ============
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('[PROJECT STAGE]', 50, yPosition);
      yPosition += 25;

      doc
        .fontSize(11)
        .font('Helvetica')
        .fillColor('#0085ff')
        .text(selectedStage, 50, yPosition);
      yPosition += 25;

      // ============ USER CONTACT SECTION ============
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#000000')
        .text('[USER CONTACT]', 50, yPosition);
      yPosition += 20;

      doc
        .fontSize(10)
        .font('Helvetica')
        .text(`Email: ${userEmail}`, 50, yPosition);
      yPosition += 25;

      // ============ REQUIREMENTS SUMMARY SECTION ============
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('[REQUIREMENTS SUMMARY]', 50, yPosition);
      yPosition += 20;

      // Add summary text with proper wrapping
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#333333')
        .text(requirementsSummary || 'No summary provided', 50, yPosition, {
          width: doc.page.width - 100,
          align: 'left',
        });

      yPosition = doc.y + 15;

      // ============ CONVERSATION HISTORY SECTION ============
      if (conversationHistory && conversationHistory.length > 0) {
        if (yPosition > doc.page.height - 150) {
          doc.addPage();
          yPosition = 50;
        }

        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .fillColor('#000000')
          .text('[CONVERSATION HISTORY]', 50, yPosition);
        yPosition += 20;

        conversationHistory.forEach((msg, index) => {
          if (yPosition > doc.page.height - 80) {
            doc.addPage();
            yPosition = 50;
          }

          const role = msg.role === 'user' ? '👤 You' : '🤖 Assistant';

          // Draw role label
          doc
            .fontSize(10)
            .font('Helvetica-Bold')
            .fillColor(msg.role === 'user' ? '#0085ff' : '#666666')
            .text(role, 50, yPosition);

          yPosition += 16;

          // Message content with wrapping
          doc
            .fontSize(9)
            .font('Helvetica')
            .fillColor('#333333')
            .text(msg.content || '', 60, yPosition, {
              width: doc.page.width - 120,
              align: 'left',
            });

          yPosition = doc.y + 8;
        });
      }

      // ============ FOOTER ============
      yPosition += 20;

      if (yPosition > doc.page.height - 60) {
        doc.addPage();
      }

      doc
        .moveTo(50, doc.page.height - 60)
        .lineTo(doc.page.width - 50, doc.page.height - 60)
        .stroke('#cccccc');

      doc
        .fontSize(9)
        .fillColor('#999999')
        .text('Solidev Electrosoft Pvt. Ltd.', 50, doc.page.height - 50, {
          align: 'center',
        });

      doc
        .fontSize(8)
        .text('Powered by AI Requirements Assistant', 50, doc.page.height - 35, {
          align: 'center',
        });

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  generateRequirementsPDF,
};
