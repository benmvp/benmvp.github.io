import React, { useMemo, ReactNode } from 'react'
import {
  makeStyles,
  createStyles,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
  useScrollTrigger,
  Toolbar,
  Container,
  Box,
  Zoom,
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Fab } from 'gatsby-theme-material-ui'
import Header from './Header'
import Footer from './Footer'
import { getTheme } from '../../config/theme'

interface ChildrenProps {
  children: ReactNode
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
    container: {
      minHeight: '100vh',
    },
    toTop: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    backToTopAnchor: {
      height: 104,
    },
  }),
)

const ScrollTop = ({ children }: ChildrenProps) => {
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.toTop}>
        {children}
      </div>
    </Zoom>
  )
}

const Layout = ({ children }: ChildrenProps) => {
  const classes = useStyles()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box component="section" className={classes.root}>
          <Header />
          <Container maxWidth="md" className={classes.container}>
            <Toolbar
              id="back-to-top-anchor"
              className={classes.backToTopAnchor}
            />
            <Box component="main">{children}</Box>
          </Container>
          <Footer />
          <ScrollTop>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Layout
