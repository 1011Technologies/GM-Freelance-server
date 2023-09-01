let storedUser = null;  // This will store the user after signup
storedUser = {
  user_id: 1,
  first_name: 'Moin',
  last_name: 'Ud Din',
  gender: 'Male',
  phone_no: '03123456789',
  email: 'moinrajput594@gmail.com',
  password: '1234567!',
  user_type: 'Client',
  profile_picture: 'https://placebear.com/g/200/200',
  client_id: 1,
  house_no: 'A-123',
  street: '123',
  town: 'Bahria Town',
  city: 'Islamabad',
  postal_code: '44000',
  geom: '123,123',
};

let subscribedEmails = new Set();  // This will store the subscribed emails

const mockAPI = {
  login: (loginDetail) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (storedUser === null) {
        reject('No user stored. Please sign up first.');
        return;
      }

      if (storedUser.email !== loginDetail.email || storedUser.password !== loginDetail.password) {
        reject('Invalid email or password.');
        return;
      }

      // Store user object in local storage after successful login
      localStorage.setItem('user', JSON.stringify(storedUser));
      localStorage.setItem('userType', storedUser.user_type);

      // Simulate a successful login
      resolve({
        user: {
          email: storedUser.email,
          password: storedUser.password,
          user_type: storedUser.user_type
        }
      });
    }, 1000);
  }),

  signup: (signupDetail) => new Promise((resolve) => {
    setTimeout(() => {
      // Store the user after signup
      storedUser = {
        email: signupDetail.email,
        password: signupDetail.password,
        user_type: signupDetail.user_type
      };

      // Simulate a successful signup
      resolve({
        user: {
          email: signupDetail.email,
          password: signupDetail.password,
          user_type: signupDetail.user_type
        }
      });
    }, 1000);
  }),

  logout: () => {
    // Remove user object from local storage on logout
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  },

  fetchUser: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (storedUser === null) {
        reject('No user stored. Please sign up first.');
        return;
      }
      // Simulate a successful fetch
      resolve({ user: storedUser });
    }, 1000);
  }),

  subscribeEmail: (email) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (subscribedEmails.has(email)) {
        reject('Email is already subscribed. Try a different email'); // Return error message when email is already subscribed
        return;
      }

      // Simulate a successful subscription
      subscribedEmails.add(email);
      resolve(true);
    }, 1000);
  }),

  checkEmailSubscription: (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(subscribedEmails.has(email));
      }, 1000);
    });
  },
};

export default mockAPI;