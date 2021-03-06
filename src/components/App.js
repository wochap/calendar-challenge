import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
// eslint-disable-next-line
import sanitize from "!!css-loader!sanitize.css/sanitize.css"
import { StoreProvider } from 'easy-peasy';
import store from '../store';
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
      <StoreProvider store={store}>
        <Global
          styles={css`
            ${sanitizeCSS}
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                'Helvetica Neue', sans-serif;
            }
            button {
              cursor: pointer;
            }
          `}
        />
        <AppContainer>
          <Calendar />
        </AppContainer>
      </StoreProvider>
    </div>
  );
}

export default App;
