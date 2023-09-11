import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";

import router from "./router";
import MISAButton from "./components/MISAButton.vue";
import MISACombobox from "./components/MISACombobox.vue";
import MISALogo from "./components/MISALogo.vue";
import MISATextfield from "./components/MISATextfield.vue";
import MISACheckbox from "./components/MISACheckbox.vue";
import MISAModal from "./components/MISAModal.vue";
import MISATextarea from "./components/MISATextarea.vue";
import MISALoading from "./components/MISALoading.vue";
import MISADialog from "./components/MISADialog.vue";
import MISAToastMessage from "./components/MISAToastMessage.vue";

const app = createApp(App);

app.component("MISAButton", MISAButton);
app.component("MISACombobox", MISACombobox);
app.component("MISALogo", MISALogo);
app.component("MISATextfield", MISATextfield);
app.component("MISACheckbox", MISACheckbox);
app.component("MISAModal", MISAModal);
app.component("MISATextarea", MISATextarea);
app.component("MISALoading", MISALoading);
app.component("MISADialog", MISADialog);
app.component("MISAToastMessage", MISAToastMessage);

app.use(router);
app.use(store);

app.mount("#app");
