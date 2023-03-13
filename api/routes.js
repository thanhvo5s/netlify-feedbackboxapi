'use strict';
module.exports = function(app) {
  let productsCtrl = require('./controllers/ProductsController');
  let accountsCtrl = require('./controllers/AccountsController');
  let accountconfigsCtrl = require('./controllers/AccountConfigsController');
  let feedbackmsgsCtrl = require('./controllers/FeedbackMsgsController');

  //Products (for sample code only)
 /*  app.route('/products')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/products/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
 */
  //Accounts
  app.route('/acc_ounts')
    .get(accountsCtrl.get)
    .post(accountsCtrl.store);

  app.route('/tks/:accountguid')
    .get(accountsCtrl.detail);
/*     .put(accountsCtrl.update)
    .delete(accountsCtrl.delete); */

  app.route('/tks/fb/:feedbackguid')
    .get(accountsCtrl.detailfeedback);

  app.route('/tks/fbwithphone/:feedbackguid')
    .get(accountsCtrl.detailfeedback2);

  //AccountConfigs
  app.route('/tkconfigs/:accountguid')
    .get(accountconfigsCtrl.detail)
    .put(accountconfigsCtrl.update);
  app.route('/tk_configs/')
    .post(accountconfigsCtrl.store);  

  //FeedbackMsgs
  app.route('/feedbackmsgs/:feedbackguid')
    .get(feedbackmsgsCtrl.getbyfeedbackguid);
  app.route('/feedbackmsgs/dailycheck/:feedbackguid')
    .get(feedbackmsgsCtrl.getfordailycheck);  
  app.route('/feedbackmsgs/read/:id')
    .put(feedbackmsgsCtrl.markAsRead);
  app.route('/feedbackmsgs/')
    .post(feedbackmsgsCtrl.store); 
};