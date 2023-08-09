const pool = require('../../db');


const updateDetail = async (req, res) => {
    try {
        const { first_name, last_name, gender, phone_no, house_no, street, city, postal_code, state, country, longitude, latitude } = req.body;
        await pool.query("BEGIN");
        await pool.query(
            `UPDATE users 
            SET 
              first_name = $1, 
              last_name = $2, 
              gender = $3, 
              phone_no = $4, 
              city = $7, 
              state = $9, 
              street = $6, 
              house_no = $5, 
              postal_code = $8, 
              geom = POINT($11, $12)
              country=$10
            WHERE user_id = $13`,
            [first_name, last_name, gender, phone_no, house_no, street, city, postal_code, state, country, longitude, latitude , req.user]
        );


        await pool.query("COMMIT");
        res.status(200).json({ success: 'updated' });



    } catch (error) {
        await pool.query("ROLLBACK");

        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
}


module.exports = {
    updateDetail
} 
