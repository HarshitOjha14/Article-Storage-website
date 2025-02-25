const emailVerificationTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #f4f7fa;
				font-family: 'Roboto', Arial, sans-serif;
				font-size: 16px;
				line-height: 1.5;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 30px auto;
				padding: 30px;
				background-color: #ffffff;
				border-radius: 8px;
				box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
				text-align: center;
			}
	
			.logo {
				max-width: 180px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 22px;
				font-weight: bold;
				color: #1a73e8;
				margin-bottom: 15px;
			}
	
			.body {
				font-size: 16px;
				color: #333333;
				margin-bottom: 25px;
				line-height: 1.6;
			}
	
			.cta {
				display: inline-block;
				padding: 12px 25px;
				background-color: #1a73e8;
				color: #ffffff;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
				border: none;
				cursor: pointer;
			}
	
			.cta:hover {
				background-color: #0c59c9;
			}
	
			.support {
				font-size: 14px;
				color: #777777;
				margin-top: 25px;
			}
	
			.highlight {
				font-size: 24px;
				color: #d32f2f;
				font-weight: bold;
				padding: 10px;
				border: 2px solid #d32f2f;
				border-radius: 5px;
				background-color: #fbe9e7;
			}
	
			a {
				color: #1a73e8;
				text-decoration: none;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://www.articlesstoragehub.com">ArticleStorageHub</a>
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with ArticleStorageHub. To complete your registration, please use the following OTP (One-Time Password) to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email. Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			
			<div class="support">
				If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@articlesstoragehub.com">support@articlesstoragehub.com</a>. We are here to help!
			</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = emailVerificationTemplate;
