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
      .orderBy("bookingDayStr", "asc")
      .get()
      .then(function (doc) {
        doc.forEach(function (doc) {
          customerHistoryWrapper.appendChild(customerWrapper);
          // Create Element To Put Inside Data

          const details = document.createElement("details");
          customerWrapper.appendChild(details);

          const summary = document.createElement("summary");
          details.appendChild(summary);
          summary.innerHTML = `${doc.data().bookingDayStr} &nbsp; ${
            doc.data().location
          }`;

          const wrapper = document.createElement("div");
          wrapper.classList.add("wrapper");
          details.appendChild(wrapper);

          // order id
          const orderIdWrapper = document.createElement("div");
          orderIdWrapper.classList.add("blockWrapper");
          orderIdWrapper.classList.add("ownerWrapper");
          wrapper.appendChild(orderIdWrapper);

          const orderIdTitle = document.createElement("div");
          orderIdTitle.classList.add("orderTitle");
          orderIdTitle.classList.add("orderIdTitle");
          orderIdWrapper.appendChild(orderIdTitle);
          orderIdTitle.innerHTML = "訂單號碼：";

          const orderIdContent = document.createElement("div");
          orderIdContent.classList.add("orderContent");
          orderIdContent.classList.add("orderIdContent");
          orderIdWrapper.appendChild(orderIdContent);
          orderIdContent.innerHTML = `${doc.data().orderId}`;

          // order time
          const orderTimeWrapper = document.createElement("div");
          orderTimeWrapper.classList.add("blockWrapper");
          orderTimeWrapper.classList.add("orderTimeWrapper");
          wrapper.appendChild(orderTimeWrapper);

          const orderTimeTitle = document.createElement("div");
          orderTimeTitle.classList.add("orderTitle");
          orderTimeTitle.classList.add("orderTimeTitle");
          orderTimeWrapper.appendChild(orderTimeTitle);
          orderTimeTitle.innerHTML = "預定時間：";

          const orderTimeContent = document.createElement("div");
          orderTimeContent.classList.add("orderContent");
          orderTimeContent.classList.add("orderTimeContent");
          orderTimeWrapper.appendChild(orderTimeContent);
          orderTimeContent.innerHTML = `${doc.data().bookingtime}`;

          // owner name
          const ownerWrapper = document.createElement("div");
          ownerWrapper.classList.add("blockWrapper");
          ownerWrapper.classList.add("ownerWrapper");
          wrapper.appendChild(ownerWrapper);

          const ownerTitle = document.createElement("div");
          ownerTitle.classList.add("orderTitle");
          ownerTitle.classList.add("ownerTitle");
          ownerWrapper.appendChild(ownerTitle);
          ownerTitle.innerHTML = "飼主姓名：";

          const ownerContent = document.createElement("div");
          ownerContent.classList.add("orderContent");
          ownerContent.classList.add("ownerContent");
          ownerWrapper.appendChild(ownerContent);
          ownerContent.innerHTML = `${doc.data().owner}`;

          // pet name
          const petWrapper = document.createElement("div");
          petWrapper.classList.add("blockWrapper");
          petWrapper.classList.add("petWrapper");
          wrapper.appendChild(petWrapper);

          const petTitle = document.createElement("div");
          petTitle.classList.add("orderTitle");
          petTitle.classList.add("petTitle");
          petWrapper.appendChild(petTitle);
          petTitle.innerHTML = "寵物姓名：";

          const petContent = document.createElement("div");
          petContent.classList.add("orderContent");
          petContent.classList.add("petContent");
          petWrapper.appendChild(petContent);
          petContent.innerHTML = `${doc.data().pet}`;

          // contact phone
          const contactPhoneWrapper = document.createElement("div");
          contactPhoneWrapper.classList.add("blockWrapper");
          contactPhoneWrapper.classList.add("contactPhoneWrapper");
          wrapper.appendChild(contactPhoneWrapper);

          const contactPhoneTitle = document.createElement("div");
          contactPhoneTitle.classList.add("orderTitle");
          contactPhoneTitle.classList.add("contactPhoneTitle");
          contactPhoneWrapper.appendChild(contactPhoneTitle);
          contactPhoneTitle.innerHTML = "聯絡電話：";

          const contactPhoneContent = document.createElement("div");
          contactPhoneContent.classList.add("orderContent");
          contactPhoneContent.classList.add("contactPhoneContent");
          contactPhoneWrapper.appendChild(contactPhoneContent);
          contactPhoneContent.innerHTML = `${doc.data().phone}`;

          // email
          const emailWrapper = document.createElement("div");
          emailWrapper.classList.add("blockWrapper");
          emailWrapper.classList.add("emailWrapper");
          wrapper.appendChild(emailWrapper);

          const emailTitle = document.createElement("div");
          emailTitle.classList.add("orderTitle");
          emailTitle.classList.add("emailTitle");
          emailWrapper.appendChild(emailTitle);
          emailTitle.innerHTML = "Email：";

          const emailContent = document.createElement("div");
          emailContent.classList.add("orderContent");
          emailContent.classList.add("emailContent");
          emailWrapper.appendChild(emailContent);
          emailContent.innerHTML = `${doc.data().email}`;

          // Line
          const lineWrapper = document.createElement("div");
          lineWrapper.classList.add("blockWrapper");
          lineWrapper.classList.add("lineWrapper");
          wrapper.appendChild(lineWrapper);

          const lineTitle = document.createElement("div");
          lineTitle.classList.add("orderTitle");
          lineTitle.classList.add("lineTitle");
          lineWrapper.appendChild(lineTitle);
          lineTitle.innerHTML = "Line ID:";

          const lineContent = document.createElement("div");
          lineContent.classList.add("orderContent");
          lineContent.classList.add("lineContent");
          lineWrapper.appendChild(lineContent);
          lineContent.innerHTML = `${doc.data().Line}`;

          // remind
          const remindWrapper = document.createElement("div");
          remindWrapper.classList.add("blockWrapper");
          remindWrapper.classList.add("remindWrapper");
          wrapper.appendChild(remindWrapper);

          const remindTitle = document.createElement("div");
          remindTitle.classList.add("orderTitle");
          remindTitle.classList.add("remindTitle");
          remindWrapper.appendChild(remindTitle);
          remindTitle.innerHTML = "我們應該注意的事情：";

          const remindContent = document.createElement("div");
          remindContent.classList.add("orderContent");
          remindContent.classList.add("remindContent");
          remindWrapper.appendChild(remindContent);
          remindContent.innerHTML = `${doc.data().remind}`;
        });
      });
  }
});
