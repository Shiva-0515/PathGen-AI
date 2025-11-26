// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import Container from '@mui/material/Container';
// import Divider from '@mui/material/Divider';
// import MenuItem from '@mui/material/MenuItem';
// import Drawer from '@mui/material/Drawer';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import ColorModeIconDropdown from '../ColorModeIconDropdown';
// import Sitemark from './SitemarkIcon';
// import { useNavigate } from "react-router-dom";

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   flexShrink: 0,
//   borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
//   backdropFilter: 'blur(24px)',
//   border: '1px solid',
//   borderColor: (theme.vars || theme).palette.divider,
//   backgroundColor: theme.vars
//     ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
//     : alpha(theme.palette.background.default, 0.4),
//   boxShadow: (theme.vars || theme).shadows[1],
//   padding: '8px 12px',
// }));

// export default function AppAppBar() {
//   const [open, setOpen] = React.useState(false);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   const toggleDrawer = (newOpen) => () => setOpen(newOpen);

//   useEffect(() => {
//     fetch("http://localhost:5000/auth/status", {
//       method: "GET",
//       // withCredentials: true,
//       credentials: 'include',
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.loggedIn) setUser(data.user);
//       })
//       .finally(() => setLoading(false));
//   }, []);
// console.log("User state in AppAppBar:", user);
//   const handleLogout = async () => {
//     await fetch("http://localhost:5000/logout", {
//       method: "GET",
//       withCredentials: true,
//     });
//     setUser(null);
//     navigate("/"); // redirect to homepage after logout
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <AppBar position="fixed" enableColorOnDark sx={{ boxShadow: 0, bgcolor: "transparent", backgroundImage: "none", mt: "calc(var(--template-frame-height, 0px) + 28px)" }}>
//       <Container maxWidth="lg">
//         <StyledToolbar variant="dense" disableGutters>
//           <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
//             <Sitemark/>
//             <Button variant="text" color="info" size="small" onClick={()=>navigate("/pricing")}>Pricing</Button>
//             <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }} onClick={() => navigate('/FAQ')}>FAQ</Button>
//             <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }} onClick={() => navigate('/roadmap')}>Generate</Button>
//             <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }} onClick={() => navigate('/quiz')}>Quiz</Button> 
//           </Box>

//           <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
//             {!user && (
//               <>
//                 <Button color="primary" variant="text" size="small" onClick={() => navigate("/login")}>Sign in</Button>
//                 <Button color="primary" variant="contained" size="small" onClick={() => navigate("/register")}>Sign up</Button>
//               </>
//             )}
//             {user && (
//               <>
//               <p color="secondary" variant="outlined" size="small">{user}</p>
//               <Button color="secondary" variant="outlined" size="small" onClick={handleLogout}>Logout</Button>
//               </>
//             )}
//             <ColorModeIconDropdown />
//           </Box>

//           <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
//             <ColorModeIconDropdown size="medium" />
//             <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
//               <MenuIcon />
//             </IconButton>
//             <Drawer anchor="top" open={open} onClose={toggleDrawer(false)} PaperProps={{ sx: { top: 'var(--template-frame-height, 0px)' } }}>
//               <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                   <IconButton onClick={toggleDrawer(false)}><CloseRoundedIcon /></IconButton>
//                 </Box>

//                 <MenuItem>Features</MenuItem>
//                 <MenuItem>Testimonials</MenuItem>
//                 <MenuItem>Highlights</MenuItem>
//                 <MenuItem>Pricing</MenuItem>
//                 <MenuItem>FAQ</MenuItem>
//                 <MenuItem>Blog</MenuItem>
//                 <Divider sx={{ my: 3 }} />

//                 {!user && (
//                   <>
//                     <MenuItem>
//                       <Button color="primary" variant="contained" fullWidth onClick={() => navigate('/register')}>Sign up</Button>
//                     </MenuItem>
//                     <MenuItem>
//                       <Button color="primary" variant="outlined" fullWidth onClick={() => navigate('/login')}>Sign in</Button>
//                     </MenuItem>
//                   </>
//                 )}
//                 {user && (
//                   <MenuItem>
//                     <Button color="secondary" variant="outlined" fullWidth onClick={handleLogout}>Logout</Button>
//                   </MenuItem>
//                 )}

//               </Box>
//             </Drawer>
//           </Box>
//         </StyledToolbar>
//       </Container>
//     </AppBar>
//   );
// }

import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import { useNavigate } from "react-router-dom";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // ------------------------------
  // OLD AUTH (commented out)
  // ------------------------------
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/auth/status", {
      method: "GET",
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "GET",
      // withCredentials: true,
      credentials: 'include',
    });
    setUser(null);
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;


  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark/>
            <Button variant="text" color="info" size="small" onClick={()=>navigate("/pricing")}>Pricing</Button>
            <Button variant="text" color="info" size="small" onClick={()=>navigate("/FAQ")}>FAQ</Button>
            <Button variant="text" color="info" size="small" onClick={()=>navigate("/roadmap")}>Generate</Button>
            <Button variant="text" color="info" size="small" onClick={()=>navigate("/quiz")}>Quiz</Button> 
          </Box>

          {/* Desktop buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {/* ------------------------------
                OLD AUTH BUTTONS (commented out)
            ------------------------------- */}
            
            {!user && (
              <>
                <Button color="primary" variant="text" size="small" onClick={() => navigate("/login")}>Sign in</Button>
                <Button color="primary" variant="contained" size="small" onClick={() => navigate("/register")}>Sign up</Button>
              </>
            )}
            {user && (
              <>
                <p color="secondary" variant="outlined" size="small">{user}</p>
                <Button color="secondary" variant="outlined" size="small" onClick={handleLogout}>Logout</Button>
              </>
            )}
           

            {/* ------------------------------
                CLERK AUTH BUTTONS
            ------------------------------- */}
            
              {/* <ClerkThemedAuth/> */}


            <ColorModeIconDropdown />
          </Box>

          {/* Mobile drawer */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{ sx: { top: 'var(--template-frame-height, 0px)' } }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}><CloseRoundedIcon /></IconButton>
                </Box>

                <MenuItem onClick={() => navigate("/pricing")}>Pricing</MenuItem>
                <MenuItem onClick={() => navigate("/FAQ")}>FAQ</MenuItem>
                <MenuItem onClick={() => navigate("/roadmap")}>Generate</MenuItem>
                <MenuItem onClick={() => navigate("/quiz")}>Quiz</MenuItem>
                <Divider sx={{ my: 3 }} />

                {/* OLD MOBILE AUTH (commented out) */}
                
                {!user && (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth onClick={() => navigate('/register')}>Sign up</Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="outlined" fullWidth onClick={() => navigate('/login')}>Sign in</Button>
                    </MenuItem>
                  </>
                )}
                {user && (
                  <MenuItem>
                    <Button color="secondary" variant="outlined" fullWidth onClick={handleLogout}>Logout</Button>
                  </MenuItem>
                )}
               

                {/* CLERK MOBILE AUTH */}
                {/* <Divider sx={{ my: 3 }} />
                
                  <ClerkThemedAuth/> */}

              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
