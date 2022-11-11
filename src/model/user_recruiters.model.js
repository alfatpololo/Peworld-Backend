const db = require('../config/db')

const userRecruitersModel = {
  // router list
  selectAllRecruiters: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM user_recruiters', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router details
  selectDetailRecruiters: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user_recruiters WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router insert
  store: (username, phone, password) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO users (username, phone, password)
            VALUES
            ('${username}', '${phone}', '${password}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  //model register
  registerRecruiters: ({name, password, email, company, position, phone, image_recruiters}) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            INSERT INTO user_recruiters (name, password, email, company, position, phone, image_recruiters)
            VALUES
            ('${name}', '${password}', '${email}', '${company}', '${position}', '${phone}', '${image_recruiters}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // model login
  checkUsernameRecruiters: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user_recruiters WHERE email = '${email}'`, (err, res) => {
        if(err) {
          reject(err)
        }
        resolve(res);
      })
    })
  },
  
  updateUserRecruiters: (id, name, field, city, description, email, instagram, phone, linkedin) => {
    return new Promise ((resolve, reject) => {
      db.query(`UPDATE user_recruiters SET
        name = COALESCE ($1, name),
        field = COALESCE ($2, field),
        city = COALESCE ($3, city),
        description = COALESCE ($4, description),
        email = COALESCE ($5, email),
        instagram = COALESCE ($6, instagram),
        phone = COALESCE ($7, phone),
        linkedin = COALESCE ($8, linkedin)
        WHERE id = $9
        `,
        [name, field, city, description, email, instagram, phone, linkedin, id]
      
            , (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
  destroyRecruiters: (id) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            DELETE FROM user_recruiters where id=${id}
            `, (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
}

module.exports = userRecruitersModel