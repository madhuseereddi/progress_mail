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
    user: 'seereddmm@gmail.com',
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
    to: 'sasisasi8572@gmail.com,seereddim@gmail.com',
    subject: 'Daily Coding Questions - Your Daily Challenge',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f7fc;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              max-width: 700px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 10px;
              box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(90deg, #6a1b9a, #3a4db3);
              color: white;
              text-align: center;
              padding: 30px;
              font-size: 32px;
              font-weight: bold;
            }
            .content {
              padding: 30px;
              line-height: 1.6;
              color: #4a4a4a;
            }
            .content h2 {
              font-size: 24px;
              color: #1e3d58;
              margin-bottom: 15px;
            }
            .day-count {
              color: #1d76c2;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 25px;
            }
            .question {
              background: #f8f9fa;
              margin: 20px 0;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #ddd;
              font-size: 18px;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
              transition: background 0.3s ease;
            }
            .question:hover {
              background: #e3e8f0;
            }
            .btn {
              display: inline-block;
              text-decoration: none;
              color: #ffffff;
              background-color: rgb(183, 200, 252);
              padding: 10px 20px;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
              transition: background-color 0.3s ease;
            }
            .btn:hover {
              background-color: #45a049;
            }
            .footer {
              background: #f1f1f1;
              text-align: center;
              padding: 20px;
              font-size: 14px;
              color: #555;
              border-top: 1px solid #e0e0e0;
            }
            .instructions {
              font-size: 16px;
              color: #333;
              margin-top: 20px;
            }
            .btn-wrapper {
              margin-top: 25px;
              text-align: center;
            }
            .instructions ul {
              list-style-type: square;
              padding-left: 20px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Your Daily Coding Challenge</div>
            <div class="content">
              <h2>Hello, here are your coding questions for today:</h2>
              <div class="day-count">
                Day: ${Math.floor(questionIndex / 2) + 1}
              </div>
              ${questionsToSend.map((question, index) => `
                <div class="question">
                  <strong>Q${index + 1}: </strong>${question}
                </div>
              `).join('')}
              <div class="btn-wrapper">
                <a class="btn" href="https://www.onlinegdb.com/online_c_compiler" target="_blank">Start Coding Now</a>
              </div>
              <div class="instructions">
                <p><strong>Additional Instructions:</strong></p>
                <ul>
                  <li>Login with the credentials: <br/><strong>Email:</strong> <em>seereddim@gmail.com</em><br/><strong>Password:</strong> <em>Saimadhu@123</em>.</li>
                  <li>Go to "My Projects".</li>
                  <li>Click the folder allocated to you.</li>
                  <li>Click on "New Project".</li>
                  <li>Start working on your project, and click "Save" to store your progress.</li>
                </ul>
                <p>Best of luck, and happy coding!</p>
              </div>
            </div>
            <div class="footer">
              <p>Sent with ❤️ from Your Coding Assistant</p>
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
  '45 07 * * *', // Adjust this to the desired time
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
