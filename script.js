import "core-js/stable";

const account1 = {
  owner: "Saurabh Jadhav",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Shivling Kharade",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account3 = {
  owner: "Mangesh Bhise",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account4 = {
  owner: "Pushpak kothlikar",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

//stores all account data as object of array
const accounts = [account1, account2, account3, account4];

// variables to manipulate
const login_User = document.querySelector(".login_input_user");
const login_Pin = document.querySelector(".login_input_pin");
const login_btn = document.querySelector(".login_btn");
const balanced_Value = document.querySelector(".balance_value");
const date = document.querySelector(".balance_date");

const movement_container = document.querySelector(".movements");
const summary_in = document.querySelector(".summary_value_in");
const summary_out = document.querySelector(".summary_value_out");
const summary_value_interest = document.querySelector(
  ".summary_value_interest"
);

const message = document.querySelector(".welcome");
const containerapp = document.querySelector(".app");
const button_transfer = document.querySelector(".form_btn_transfer");
const transfer_to = document.querySelector(".form_input_to");
const transfer_amount = document.querySelector(".form_input_amount");
const close_btn = document.querySelector(".form_btn_close");
const close_account = document.querySelector(".form_input_user");
const account_pin = document.querySelector(".form_input_pin");
const button_loan = document.querySelector(".form_btn_loan");
const loan_amount = document.querySelector(".form_input_loan_amount");
const button_sort = document.querySelector(".btn_sort");
const countdown = document.querySelector(".timer");

// # 1 create username with acc.owner name

const createusernames = function (accs) {
  // this will take first letter and create user name for each account
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

//creates username for each account in accounts array
createusernames(accounts);

let currentaccount; //used for login
let timer; // user for logout session
let state = false; //used for sorting

// # 2 login after clicking on login button arrow
login_btn.addEventListener("click", function (e) {
  e.preventDefault();

  // this will find the account details with matching to enter username
  currentaccount = accounts.find((acc) => acc.username === login_User.value);

  //after login display the welcome message
  if (currentaccount?.pin === Number(login_Pin.value)) {
    message.textContent = `Welcome back ${
      currentaccount.owner.split(" ")[0]
    } !!✅`;

    // display date in current balance of today
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();
    //this will display date as per below format
    date.textContent = `${day}/${month}/${year},${hour}:${min}`;

    login_Pin.value = login_User.value = " ";

    // make all banking details visible of user
    containerapp.style.opacity = 100;

    // for inactivity start logoutsession
    logoutSession();

    //update the ui with all details of current account
    update_Ui(currentaccount);
  }

  // displaymovements(currentaccount.movements);
  // calcbalance(currentaccount);
  // calcsummary(currentaccount);
});

// 2 logout session
const logoutSession = function () {
  //set timer
  let time = 300;

  //clock
  timer = setInterval(function () {
    const min = Math.trunc(time / 60);
    const sec = time % 60;

    //make visible in minutes for definded time in seconds
    countdown.textContent = `${min}:${sec}`;

    //if timer became zero then it logouts as opacity became zero
    if (time === 0) {
      clearInterval(timer);
      containerapp.style.opacity = 0;
      message.textContent = "Session Logout ⌛!!";
    }
    // this will be reverse countdown
    time--;
  }, 1000);

  //logout
};

// 3 update the UI with current account as parameter here
const update_Ui = function (acc) {
  displaymovements(acc);
  calcbalance(acc);
  calcsummary(acc);
};

//4 display the transaction of earlier record as well as new one
const displaymovements = function (acc, sort = false) {
  //set transaction as null after loading and then insert data which will remove hardcode data in html
  movement_container.innerHTML = " ";

  //sort as movs will be new array which has sorted data of transaction if sort is true by default is set to false
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // this will be display for each transaction for each value in movs
  movs.forEach(function (mov, i) {
    //helps to display resolve is deposit or withdrawal
    const type = mov > 0 ? "deposit" : "withdrawal";

    // display date of array movementsdates
    const d = new Date(acc.movementsDates[i]);
    const day = `${d.getDate()}`;
    const month = `${d.getMonth() + 1} `;
    const year = `${d.getFullYear()}`;
    const date_display = `${day}/${month}/${year}`;

    //display the date and desposit and withdrawal and amount
    const html = `<div class="movements_row">
    <div class="movements_type movements_type_${type}">${i + 1} ${type}</div>
    <div class="movements_date">${date_display}</div>
    <div class="movements_value">${mov.toFixed(2)}$</div>
  </div>`;

    //insert all in movement container
    movement_container.insertAdjacentHTML("afterbegin", html);
  });
};

// 5 calculate balance with help of reduce method for all transactions
const calcbalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);

  balanced_Value.textContent = `${acc.balance.toFixed(2)}$`;
};

// 6 Display the summary for account of user
const calcsummary = function (acc) {
  //calculate credit transaction amount
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);

  summary_in.textContent = `${incomes.toFixed(2)}$`;

  //calculate debit transaction amount
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);

  summary_out.textContent = `${Math.abs(out).toFixed(2)}$`;

  //calculate the interest as per specific for each account
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);

  summary_value_interest.textContent = `${interest.toFixed(2)}$`;
};

//transfer amount to other account
button_transfer.addEventListener(
  "click",
  function (e) {
    e.preventDefault();

    const amount = Number(transfer_amount.value);

    // get the receiveraccount with matching id
    const receiveraccount = accounts.find(
      (acc) => acc.username === transfer_to.value
    );

    // this will  check the condition for transfer if transfer is positive value and having enough amount and receiveraccount and currentaccountshould not be same
    if (
      amount > 0 &&
      currentaccount.balance >= amount &&
      receiveraccount.username != currentaccount.username
    ) {
      //debit
      currentaccount.movements.push(-amount);
      //credit
      receiveraccount.movements.push(amount);
      transfer_to.value = transfer_amount.value = " ";

      //date of today for the transaction
      currentaccount.movementsDates.push(new Date());
      receiveraccount.movementsDates.push(new Date());

      //after transaction update the UI
      update_Ui(currentaccount);

      //reset the timer after activity
      clearInterval(timer);

      timer = logoutSession();
    }
  },
  2500
);

button_loan.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("hello");

  //check if having deposit transaction of 10% of loan required
  const amount = Math.floor(loan_amount.value);
  const status = currentaccount.movements.some(
    (deposit) => (deposit / 100) * 10 >= amount
  );
  console.log(status);

  if (status && amount > 0) {
    //provide amount to user as loan
    currentaccount.movements.push(amount);
    currentaccount.movementsDates.push(new Date());

    update_Ui(currentaccount);

    //reset the timer after activity
    clearInterval(timer);

    timer = logoutSession();
  } else {
    alert("Loan value can not approved as not fulfilled required Criteria");
  }
});

close_btn.addEventListener("click", function (e) {
  e.preventDefault();

  // check the enter details
  if (
    close_account.value === currentaccount.username &&
    Number(account_pin.value) === currentaccount.pin
  ) {
    // check in the account record
    const index = accounts.findIndex(
      (acc) => acc.username === currentaccount.username
    );

    //mutate the array as delete account by setting starting index of splice by check account details
    accounts.splice(index, 1);

    //remove the visibility of with message
    containerapp.style.opacity = 0;
    message.textContent = "Account Closed !!❌";
  }
});

//sorting
button_sort.addEventListener("click", function (e) {
  e.preventDefault();

  //this will change send value to true and recall the displaymovment
  displaymovements(currentaccount, !state);

  state = !state;
});
