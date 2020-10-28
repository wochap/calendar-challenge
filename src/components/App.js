import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
// eslint-disable-next-line
import sanitize from "!!css-loader!sanitize.css/sanitize.css"
import Calendar from './Calendar';
import 'element-theme-default';

const sanitizeCSS = sanitize.toString();
const AppContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100vh;
  justify-content: center;
  overflow: auto;
  padding: 1rem;
`;

function App() {
  return (
    <div>
      <Global
        styles={css`
          ${sanitizeCSS}
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
              'Helvetica Neue', sans-serif;
          }
        `}
      />
      <AppContainer>
        <Calendar />
      </AppContainer>
    </div>
  );
}

export default App;
