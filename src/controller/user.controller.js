const userModel = require('../model/user.model')
const { success, failed } = require('../helper/response');

const userController = {
  // metod
  list: (req, res) => {
    userModel.selectAll()
      .then((results) => {
        success(res, results, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    userModel.selectDetail(id).then((results) => {
      res.json(results.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    const { username, phone, password } = req.body
    userModel.store( username, phone, password).then((results) => {
      success(res, results, 'success', 'insert user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'get all user failed')
    })
  },

  // update: (req, res) => {
  //   const {name, job_desk, city, description, tempat_kerja} = req.body
  //   const id = req.params.id
  //   // const image_user = req.file.filename
  //   const data = {id, name, job_desk, city, description, tempat_kerja}
  //   userModel.updateUser(id, name, job_desk, city, description, tempat_kerja)
  //   .then(async () => {
  //     const result = await userModel.updateUser(id);
  //     success(res, result.rows[0], "success", "data has been update");
  //     console.log(data)
  //   })
  //   .catch((err) => {
  //     failed(res, err.message, "failed", "internal server error");
  //   });
  // },

  update: (req, res) => {
    const id = req.params.id
    // const image=req.file.filename
    // eslint-disable-next-line camelcase
    const {name, job_desk, city, description, tempat_kerja} = req.body
    userModel
      .updateUser(id, name, job_desk, city, description, tempat_kerja)
      .then((result) => {
        res.json('Account Updated')
        console.log(name)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  
  destroy: (req, res) => {
    const id = req.params.id
    userModel.destroy(id).then((results) => {
      success(res, results, 'success', 'delete user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'get all user failed')
    })
  }
}

module.exports = userController
