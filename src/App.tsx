import AppRouter from './router/AppRouter';
import { HeaderMegaMenu } from './components/HeaderMegaMenu';
import { Container } from "@mantine/core"
function App() {


  return <Container>
    <HeaderMegaMenu />
    <AppRouter />;

  </Container>
}

export default App;
