const pool = require('../../db');
const getAttachments = async (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '..', '..', 'uploads', 'chat', fileName);
    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (err) {
        res.status(404).json({ error: "image not available" });
    }
};
module.exports = {
    getAttachments
};
