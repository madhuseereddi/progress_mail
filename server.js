const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron'); // Import node-cron
const problems = require('./problems'); // Importing the problems array

// Express app setup
const app = express();
const PORT = 3030;

// Keep track of the current question index
let questionIndex = 0;

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seereddym@gmail.com',
    pass: 'wdjn psjv ssba woxz', // Replace with your App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Function to send email
function sendEmail() {
  const questionsToSend = problems.slice(questionIndex, questionIndex + 2); // Fetching 2 questions to send

  if (questionsToSend.length === 0) {
    console.log('All questions have been sent.');
    return;
  }

  const mailOptions = {
    from: 'seereddym@gmail.com',
    to: 'seereddim@gmail.com',
    subject: 'Daily Coding Questions - Your Daily Challenge',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f7fc;
              color: #333;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 700px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(90deg, #6a1b9a, #3a4db3);
              color: #fff;
              padding: 20px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              padding: 20px;
            }
            .question {
              margin: 15px 0;
              padding: 15px;
              background-color: #f9f9f9;
              border-left: 5px solid #6a1b9a;
              border-radius: 5px;
            }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              color: #fff;
              background-color: #6a1b9a;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
            }
            .footer {
              text-align: center;
              padding: 15px;
              font-size: 14px;
              background-color: #f1f1f1;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Your Daily Coding Challenge</div>
            <div class="content">
              <h2>Here are your coding questions for today:</h2>
              ${questionsToSend.map((question, index) => `
                <div class="question">
                  <strong>Q${index + 1}:</strong> ${question}
                </div>
              `).join('')}
              <a class="btn" href="https://www.onlinegdb.com/online_c_compiler" target="_blank">Start Coding</a>
            </div>
            <div class="footer">
              <p>Sent with ❤️ by Your Coding Assistant</p>
            </div>
          </div>
        </body>
      </html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error.message);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });

  questionIndex += 2; // Move to the next set of questions
}

// Schedule email using node-cron
cron.schedule(
  '25 07 * * *', // Adjust this to the desired time
  () => {
    console.log('Cron job triggered at:', new Date());
    sendEmail();
  },
  {
    timezone: 'Asia/Kolkata', // Use the appropriate timezone
  }
);

// Start the Express server
app.get('/', (req, res) => {
  res.send('Email scheduler is running. Check your logs for status updates.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
