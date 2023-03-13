'use strict'

const util = require('util')
const mysql = require('mysql2')
const db = require('../db')

module.exports = {
/*     get: (req, res) => {
        let sql = 'SELECT * FROM accounts'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    }, */
    detail: (req, res) => {
        let sql = 'SELECT AdminPW FROM accountconfigs WHERE AccountGUID = ?'
        db.query(sql, [req.params.accountguid], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;

        let currentEncryptedPW = data.CurrentEncryptedPW;
        let newPlaintTextPW = data.NewPlainTextPW;
        let validCurrentPW = false;
        let sqlTmp = 'SELECT AdminPW FROM accountconfigs WHERE AccountGUID = ?'
        db.query(sqlTmp, [req.params.accountguid], (err, adminPWResponse) => {
            if (err) throw err

            if(adminPWResponse.length > 0 && currentEncryptedPW === adminPWResponse[0].AdminPW) {
                validCurrentPW = true;
            }
        })

        if(validCurrentPW) {
            let accountGuid = req.params.accountguid;
            let payload = {
                "AccountGUID": accountGuid,
                "AdminPW": newPlaintTextPW,
                "DateUpdated": "2023-03-10 00:00:00.000000"
            }

            let sql = 'UPDATE accountconfigs SET ? WHERE id = ?'
            db.query(sql, [payload, accountGuid], (err, response) => {
                if (err) throw err
                res.json({message: 'Update success!'})
            })
        }
        else {
            res.json({message: 'Nhập sai mật khẩu hiện tại'})
        }
    },
    store: (req, res) => {
        var bcrypt = require('bcrypt');
        const Encrypt = {
            cryptPassword: (password) =>
                bcrypt.genSalt(10)
                .then((salt => bcrypt.hash(password, salt)))
                .then(hash => hash),
/*             comparePassword: (password, hashPassword) =>
                    bcrypt.compare(password, hashPassword)
                    .then(resp => resp) */
        }
            

        let data = req.body;
        data.AdminPW = Encrypt.cryptPassword(data.AdminPW);

        let sql = 'INSERT INTO accountconfigs SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    /* delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    } */
}