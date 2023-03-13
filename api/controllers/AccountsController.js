'use strict'

const util = require('util')
const mysql = require('mysql2')
const db = require('../db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM accounts'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT FeedbackGUID, AccountName FROM accounts WHERE AccountGUID = ? AND Licenses > 0'
        db.query(sql, [req.params.accountguid], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    detailfeedback: (req, res) => {
        let sql = 'SELECT AccountName, ShowPhone, EnableSMS FROM accounts WHERE FeedbackGUID = ? AND Licenses > 0'
        db.query(sql, [req.params.feedbackguid], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    detailfeedback2: (req, res) => {
        let sql = 'SELECT AccountName, Phone FROM accounts WHERE FeedbackGUID = ? AND Licenses > 0'
        db.query(sql, [req.params.feedbackguid], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    /* update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE products SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    }, */
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO accounts SET ?'
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