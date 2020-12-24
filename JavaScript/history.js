// Firebase firestore initializ
const db = firebase.firestore();
const firestoreCollection = db.collection("bookingDay");

const customerHistoryWrapper = document.querySelector(
  ".customerHistoryWrapper"
);
const customerWrapper = document.querySelector(".customerWrapper");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const providerData = user.providerData[0];
    console.log(providerData.uid);
    firestoreCollection
      .where("uid", "==", providerData.uid)
      .get()
      .then(function (doc) {
        doc.forEach(function (doc) {
          console.log(doc.data());
          customerHistoryWrapper.appendChild(customerWrapper);
          // Create Element To Put Inside Data

          let details = document.createElement("details");
          customerWrapper.appendChild(details);

          let summary = document.createElement("summary");
          details.appendChild(summary);
          summary.innerHTML = `${doc.data().bookingDayStr} &nbsp; ${
            doc.data().location
          }`;

          let wrapper = document.createElement("div");
          wrapper.classList.add("wrapper");
          details.appendChild(wrapper);

          // order id
          let orderIdWrapper = document.createElement("div");
          orderIdWrapper.classList.add("blockWrapper");
          orderIdWrapper.classList.add("ownerWrapper");
          wrapper.appendChild(orderIdWrapper);

          let orderIdTitle = document.createElement("div");
          orderIdTitle.classList.add("orderTitle");
          orderIdTitle.classList.add("orderIdTitle");
          orderIdWrapper.appendChild(orderIdTitle);
          orderIdTitle.innerHTML = "訂單號碼：";

          let orderIdContent = document.createElement("div");
          orderIdContent.classList.add("orderContent");
          orderIdContent.classList.add("orderIdContent");
          orderIdWrapper.appendChild(orderIdContent);
          orderIdContent.innerHTML = `${doc.data().orderId}`;

          // order time
          let orderTimeWrapper = document.createElement("div");
          orderTimeWrapper.classList.add("blockWrapper");
          orderTimeWrapper.classList.add("orderTimeWrapper");
          wrapper.appendChild(orderTimeWrapper);

          let orderTimeTitle = document.createElement("div");
          orderTimeTitle.classList.add("orderTitle");
          orderTimeTitle.classList.add("orderTimeTitle");
          orderTimeWrapper.appendChild(orderTimeTitle);
          orderTimeTitle.innerHTML = "預定時間：";

          let orderTimeContent = document.createElement("div");
          orderTimeContent.classList.add("orderContent");
          orderTimeContent.classList.add("orderTimeContent");
          orderTimeWrapper.appendChild(orderTimeContent);

          // owner name
          let ownerWrapper = document.createElement("div");
          ownerWrapper.classList.add("blockWrapper");
          ownerWrapper.classList.add("ownerWrapper");
          wrapper.appendChild(ownerWrapper);

          let ownerTitle = document.createElement("div");
          ownerTitle.classList.add("orderTitle");
          ownerTitle.classList.add("ownerTitle");
          ownerWrapper.appendChild(ownerTitle);
          ownerTitle.innerHTML = "飼主姓名：";

          let ownerContent = document.createElement("div");
          ownerContent.classList.add("orderContent");
          ownerContent.classList.add("ownerContent");
          ownerWrapper.appendChild(ownerContent);

          // pet name
          let petWrapper = document.createElement("div");
          petWrapper.classList.add("blockWrapper");
          petWrapper.classList.add("petWrapper");
          wrapper.appendChild(petWrapper);

          let petTitle = document.createElement("div");
          petTitle.classList.add("orderTitle");
          petTitle.classList.add("petTitle");
          petWrapper.appendChild(petTitle);
          petTitle.innerHTML = "寵物姓名：";

          let petContent = document.createElement("div");
          petContent.classList.add("orderContent");
          petContent.classList.add("petContent");
          petWrapper.appendChild(petContent);

          // contact phone
          let contactPhoneWrapper = document.createElement("div");
          contactPhoneWrapper.classList.add("blockWrapper");
          contactPhoneWrapper.classList.add("contactPhoneWrapper");
          wrapper.appendChild(contactPhoneWrapper);

          let contactPhoneTitle = document.createElement("div");
          contactPhoneTitle.classList.add("orderTitle");
          contactPhoneTitle.classList.add("contactPhoneTitle");
          contactPhoneWrapper.appendChild(contactPhoneTitle);
          contactPhoneTitle.innerHTML = "聯絡電話：";

          let contactPhoneContent = document.createElement("div");
          contactPhoneContent.classList.add("orderContent");
          contactPhoneContent.classList.add("contactPhoneContent");
          contactPhoneWrapper.appendChild(contactPhoneContent);

          // email
          let emailWrapper = document.createElement("div");
          emailWrapper.classList.add("blockWrapper");
          emailWrapper.classList.add("emailWrapper");
          wrapper.appendChild(emailWrapper);

          let emailTitle = document.createElement("div");
          emailTitle.classList.add("orderTitle");
          emailTitle.classList.add("emailTitle");
          emailWrapper.appendChild(emailTitle);
          emailTitle.innerHTML = "Email：";

          let emailContent = document.createElement("div");
          emailContent.classList.add("orderContent");
          emailContent.classList.add("emailContent");
          emailWrapper.appendChild(emailContent);

          // Line
          let lineWrapper = document.createElement("div");
          lineWrapper.classList.add("blockWrapper");
          lineWrapper.classList.add("lineWrapper");
          wrapper.appendChild(lineWrapper);

          let lineTitle = document.createElement("div");
          lineTitle.classList.add("orderTitle");
          lineTitle.classList.add("lineTitle");
          lineWrapper.appendChild(lineTitle);
          lineTitle.innerHTML = "Line ID:";

          let lineContent = document.createElement("div");
          lineContent.classList.add("orderContent");
          lineContent.classList.add("lineContent");
          lineWrapper.appendChild(lineContent);

          // remind
          let remindWrapper = document.createElement("div");
          remindWrapper.classList.add("blockWrapper");
          remindWrapper.classList.add("remindWrapper");
          wrapper.appendChild(remindWrapper);

          let remindTitle = document.createElement("div");
          remindTitle.classList.add("orderTitle");
          remindTitle.classList.add("remindTitle");
          remindWrapper.appendChild(remindTitle);
          remindTitle.innerHTML = "我們應該注意的事情：";

          let remindContent = document.createElement("div");
          remindContent.classList.add("orderContent");
          remindContent.classList.add("remindContent");
          remindWrapper.appendChild(remindContent);
        });
      });
  }
});
