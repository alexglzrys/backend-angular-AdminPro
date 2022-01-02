const getUsuarios = (req, res) => {
    res.status(200).json({
        ok: true,
        usuarios: []
    });
}

module.exports = {
    getUsuarios,
}