import React, { useRef } from 'react';
import './style.css';
import Main from './pages/main/Main';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import AddReview from './pages/add-review/AddReview';
import Search from './pages/search/Search';
import Sidebar from './components/sidebar/Sidebar';
import Track from './pages/track/Track';
import { useDispatch } from 'react-redux';
import { fetchOriginalSubjects } from './store/api-actions';
import { createTheme, Grid, ThemeProvider } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const [isSidebarShown, setSidebarShown] = React.useState(false);
  const sidebarIconRef = useRef(null);

  React.useEffect(() => {
    dispatch(fetchOriginalSubjects());
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        smmd: 750,
        md: 900,
        mdlg: 1050,
        lg: 1200,
        xl: 1536,
        mdlg: 1050,
      },
    },
  });

  // md 22-78 mdlg-20-80

  // <Grid item xs={100} sm={100} md={78} mdlg={80} lg={83}>

  return (
    <ThemeProvider theme={theme}>
      <Grid container className="wrapper" columns={100}>
        <Grid item xs={0} sm={0} md={0} mdlg={0} lg={17} className="sidebar-grid">
          <Sidebar
            isSidebarShown={isSidebarShown}
            setSidebarShown={setSidebarShown}
            sidebarIconRef={sidebarIconRef}
          />
        </Grid>
        <Grid item xs={100} sm={100} md mdlg lg>
          <div className="main_container">
            <Header
              isSidebarShown={isSidebarShown}
              setSidebarShown={setSidebarShown}
              sidebarIconRef={sidebarIconRef}
            />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/search" element={<Search />}></Route>
              <Route path="/track/:id" element={<Track />} />
              <Route path="/add_review/" element={<AddReview />} />
            </Routes>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
