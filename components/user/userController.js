const pool = require('../../db');


const freelancerData = async (req, res) => {
    try {
        const Data = req.body;
        if (Data) {
            await pool.query(
                "INSERT INTO freelancer (user_id,city, town, street, house_no, postal_code, geom) VALUES ( $1, $2, $3, $4, $5,$6, ST_MakePoint($7, $8))",
                [
                    Data.user_id,
                    Data.city,
                    Data.town,
                    Data.street,
                    Data.house_no,
                    Data.postal_code,
                    Data.longitude,
                    Data.latitude,
                ]
            );

            res.send("Freelancer detail inserted");
        } else {
            res
                .status(400)
                .json({
                    error: "Enter correct details",
                });
        }
    }
    catch (err) {
        console.error(err.message);
        // Handle other errors, e.g., send an error response
        res.status(500).json({ error: "Server error" });
    }
}

const clientData = async (req, res) => {
    try {
        const Data = req.body;
        if (Data) {
            await pool.query(
                "INSERT INTO client (user_id,city, town, street, house_no, postal_code, geom) VALUES ( $1, $2, $3, $4, $5,$6, ST_MakePoint($7, $8))",
                [
                    Data.user_id,
                    Data.city,
                    Data.town,
                    Data.street,
                    Data.house_no,
                    Data.postal_code,
                    Data.longitude,
                    Data.latitude,
                ]
            );

            res.send("Client detail inserted");
        } else {
            res
                .status(400)
                .json({
                    error: "Enter correct details",
                });
        }
    }
    catch (err) {
        console.error(err.message);
        // Handle other errors, e.g., send an error response
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    freelancerData, clientData
}