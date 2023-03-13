'use strict'

const util = require('util')
const mysql = require('mysql2')
const db = require('../db')

module.exports = {
    getbyfeedbackguid: (req, res) => {
        let sql = 'SELECT * FROM feedbackmsgs where FeedbackGUID = ? order by DateCreated desc'
        db.query(sql, [req.params.feedbackguid], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    getfordailycheck: (req, res) => {
        let sql = 'SELECT * FROM feedbackmsgs where FeedbackGUID = ? AND DateCreated >= DATE_ADD(CURDATE(), INTERVAL -7 DAY) AND MarkAsRead=0'
        db.query(sql, [req.params.feedbackguid], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    markAsRead: (req, res) => {
        let sql = 'UPDATE feedbackmsgs SET MarkAsRead = 1 WHERE id = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
                res.json({message: 'PATCH success!'})
            })
    },
   
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO feedbackmsgs SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
}