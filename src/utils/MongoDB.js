// Found code in MongoDB Realm example for web https://github.com/mongodb-university/realm-tutorial-web/blob/a022adf31df05993a63ae6163deb72f8fc8eee0d/src/components/LoginScreen.js#L165
export const parseAuthenticationError = (err) => {
  const parts = err.message.split(":");
  const reason = parts[parts.length - 1].trimStart();
  if (!reason) return { status: "", message: "" };
  const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
  const match = reason.match(reasonRegex);
  const { status, message } = match?.groups ?? {};
  return { status, message };
};

// Found code in MongoDB Realm example for web https://github.com/mongodb-university/realm-tutorial-web/blob/a022adf31df05993a63ae6163deb72f8fc8eee0d/src/components/LoginScreen.js#L137
export const handleAuthenticationError = (err, setError) => {
  const { status, message } = parseAuthenticationError(err);
  const errorType = message || status;
  switch (errorType) {
    case "invalid username":
      setError("Invalid email address.");
      break;
    case "invalid username/password":
    case "invalid password":
    case "401":
      setError("Incorrect password.");
      break;
    case "name already in use":
    case "409":
      setError("Email is already registered.");
      break;
    case "password must be between 6 and 128 characters":
    case "400":
      setError("Password must be between 6 and 128 characters.");
      break;
    default:
      break;
  }
};
