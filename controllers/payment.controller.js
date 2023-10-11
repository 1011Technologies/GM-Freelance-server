const config = async (req, res) => {}

module.exports = { config}

// const paypal = require('paypal-rest-sdk');

// // Configure PayPal with your client ID and secret
// paypal.configure({
//   mode: 'sandbox', // 'sandbox' or 'live' depending on your environment
//   client_id: 'YOUR_CLIENT_ID',
//   client_secret: 'YOUR_CLIENT_SECRET',
// });

// // Create a PayPal payment
// const createPayment = () => {
//   const paymentData = {
//     intent: 'sale',
//     payer: {
//       payment_method: 'paypal',
//     },
//     redirect_urls: {
//       return_url: 'http://yourwebsite.com/success',
//       cancel_url: 'http://yourwebsite.com/cancel',
//     },
//     transactions: [
//       {
//         item_list: {
//           items: [
//             {
//               name: 'Item Name',
//               price: '10.00',
//               currency: 'USD',
//               quantity: 1,
//             },
//           ],
//         },
//         amount: {
//           total: '10.00',
//           currency: 'USD',
//         },
//         description: 'Description of the item',
//       },
//     ],
//   };

//   paypal.payment.create(paymentData, (error, payment) => {
//     if (error) {
//       console.error(error);
//       throw error;
//     } else {
//       console.log('Payment created successfully');
//       // Redirect the user to the PayPal approval URL
//       for (const link of payment.links) {
//         if (link.rel === 'approval_url') {
//           console.log(link.href);
//           // You can redirect the user to link.href to complete the payment
//         }
//       }
//     }
//   });
// };

// // Execute the payment (after the user approves it)
// const executePayment = (paymentId, payerId) => {
//   const executeData = {
//     payer_id: payerId,
//   };

//   paypal.payment.execute(paymentId, executeData, (error, payment) => {
//     if (error) {
//       console.error(error);
//       throw error;
//     } else {
//       console.log('Payment executed successfully');
//       console.log(JSON.stringify(payment, null, 2));
//       // Handle the payment success logic here
//     }
//   });
// };

// // Call the createPayment function to initiate the payment
// createPayment();


// npm install paypal-rest-sdk
