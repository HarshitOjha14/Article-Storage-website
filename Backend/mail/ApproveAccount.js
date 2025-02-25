const accountApprovedTemplate = (name) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Account Approved Notification</title>
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
				color: #4caf50; /* Green for approval */
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
				color: black;
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
	
			a {
				color: #1a73e8;
				text-decoration: none;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://www.articlesstoragehub.com"></a>
			<div class="message">Your Account is Approved!</div>
			<div class="body">
				<p>Dear ,User</p>
				<p>Congratulations! Your account has been successfully approved. You can now log in and start publishing your articles with ease.</p>
				<p>Click the button below to log in to your account and begin sharing your content with the world:</p>
			</div>
			<div class="cta">
				<a href="http://localhost:3000/login">Login Now</a>
			</div>
			<div class="support">
				If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@articlesstoragehub.com">support@articlesstoragehub.com</a>. We're here to help!
			</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = accountApprovedTemplate;
