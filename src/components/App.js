import { Global, css } from '@emotion/core'
// eslint-disable-next-line
import sanitize from "!!css-loader!sanitize.css/sanitize.css"

const sanitizeCSS = sanitize.toString()
console.log(sanitizeCSS);

function App() {
  return (
    <div >
      <Global
        styles={css(sanitizeCSS)}
      />
      <h1>asds</h1>
    </div>
  );
}

export default App;
