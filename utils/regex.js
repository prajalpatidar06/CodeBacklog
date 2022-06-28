module.exports.regex = (type, data) => {
    const regex = {
      // Test for alpha-numeric characters with this regexp.
      //Alpha-numeric characters only
      alphaNumeric: /^[a-zA-Z0-9]*$/,
  
      username: /^[a-z0-9_.-]+$/,
      // Test for alpha-numeric characters and spaces with this regexp.
      //Alpha-numeric characters with spaces only
      alphaNumericSpace: /^[a-zA-Z0-9 ]*$/,
  
      // This regex will test for alphabetic characters only (upper and lowercase).
      //Alphabetic characters only
      alphabetic: /^[a-zA-Z]*$/,
  
      // Validate the calendar date in MM/DD/YYYY format with this regex. Optional separators are spaces, hyphens, forward slashes, and periods. The year is limited between 1900 and 2099.
      //Date (MM/DD/YYYY)
      dateMDY:
        /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/,
  
      // Validate the calendar date in YYYY/MM/DD format with this regex. Optional separators are spaces, hyphens, forward slashes, and periods. The year is limited between 1900 and 2099.
      //Date (YYYY/MM/DD)
      dateYMD:
        /^((19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01]))*$/,
  
      // Validate the calendar date in DD/MM/YYYY format with this regex. Optional separators are spaces, hyphens, forward slashes, and periods. The year is limited between 1900 and 2099.
      //Date (DD/MM/YYYY)
      dateDMY:
        /^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/,
  
      // This regex will test for digits (whole numbers).
      //Digits only
      number: /^[0-9]*$/,
  
      // This email regex is not fully RFC5322-compliant, but it will validate most common email address formats correctly.
      //Email regex
      email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  
      // Test IP Addresses with this regular expression.
      //IP address regex
      ipAddress:
        /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/,
  
      // This regex will test for lowercase letters.
      //Lowercase letters only
      alphabeticLower: /^([a-z])*$/,
  
      // Test for a strong password with this regex. The password must contain one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.
      //Password regex
      password6LUN: /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/,
  
      // This regex will test for uppercase letters.
      //Uppercase letters only
      alphabeticUpper: /^([A-Z])*$/,
  
      // This URL regex will validate most common URL formats correctly.
      //URL regex
      url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      phoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    };
  
    if (type === "alphaNumeric") {
      if (regex.alphaNumeric.test(data)) {
        return true;
      }
      return false;
    }
    if (type === "alphaNumericSpace") {
      if (regex.alphaNumericSpace.test(data)) {
        return true;
      }
      return false;
    }
    if (type === "dateMDY") {
      if (regex.dateMDY.test(data)) {
        return true;
      }
      return false;
    }
    if (type === "dateYMD") {
      if (regex.dateYMD.test(data)) {
        return true;
      }
      return false;
    }
    if (type === "dateDMY") {
      if (regex.dateDMY.test(data)) {
        return true;
      }
      return false;
    }
    if (type === "number") {
      if (regex.number.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "email") {
      if (regex.email.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "ipAddress") {
      if (regex.ipAddress.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "alphabeticLower") {
      if (regex.alphabeticLower.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "password6LUN") {
      if (regex.password6LUN.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "alphabeticUpper") {
      if (regex.alphabeticUpper.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "url") {
      if (regex.url.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "alphabetic") {
      if (regex.alphabetic.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "phoneNumber") {
      if (regex.phoneNumber.test(data)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "username") {
      if (regex.username.test(data)) {
        return true;
      } else {
        return false;
      }
    }
  };
  