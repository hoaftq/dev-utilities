import r2wc from "@r2wc/react-to-web-component";
import App from "../App";
import styles from "../index.module.css";

function AppWrapper() {
  return (
    <div className={styles.container}>
      <App />
    </div>
  );
}

// TODO: unable to use shadow root here since styles are injected to the html, not the shadow root
// Global css will affect this micro frontend

const AppElement = r2wc(AppWrapper);
const elementName = "dev-utilies";
customElements.define(elementName, AppElement);

export { elementName };
