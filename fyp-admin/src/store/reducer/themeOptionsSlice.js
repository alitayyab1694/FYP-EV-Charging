import { createSlice } from '@reduxjs/toolkit';

export const themeOptionsSlice = createSlice({
  name: 'themeOptions',
  initialState: {
    // Sidebar

    sidebarFixed: true,
    sidebarFooter: true,
    sidebarShadow: false,
    sidebarStyle: 'app-sidebar--dark',
    sidebarUserbox: true,
    sidebarToggleMobile: false,
    sidebarToggle: false,

    // Header

    headerFixed: true,
    headerShadow: true,
    headerBgTransparent: true,
    headerSearchHover: false,
    headerDrawerToggle: false,

    // Main content

    contentBackground: '',
    themeConfiguratorToggle: false,

    // Footer

    footerFixed: false,
    footerShadow: false,
    footerBgTransparent: true,

    // Page title

    pageTitleStyle: '',
    pageTitleBackground: '',
    pageTitleShadow: false,
    pageTitleIconBox: true,
    pageTitleDescription: true
  },
  reducers: {
    setSidebarShadow: (state, action) => {
      state.sidebarShadow = action.payload;
    },
    setSidebarFixed: (state, action) => {
      state.sidebarFixed = action.payload;
    },
    setSidebarStyle: (state, action) => {
      state.sidebarStyle = action.payload;
    },
    setSidebarFooter: (state, action) => {
      state.sidebarFooter = action.payload;
    },
    setSidebarToggleMobile: (state, action) => {
      state.sidebarToggleMobile = action.payload;
    },
    setSidebarToggle: (state, action) => {
      state.sidebarToggle = action.payload;
    },
    setSidebarUserbox: (state, action) => {
      state.sidebarUserbox = action.payload;
    },
    setHeaderFixed: (state, action) => {
      state.headerFixed = action.payload;
    },
    setHeaderShadow: (state, action) => {
      state.headerShadow = action.payload;
    },
    setHeaderBgTransparent: (state, action) => {
      state.headerBgTransparent = action.payload;
    },
    setHeaderSearchHover: (state, action) => {
      state.headerSearchHover = action.payload;
    },
    setHeaderDrawerToggle: (state, action) => {
      state.headerDrawerToggle = action.payload;
    },
    setHeaderDrawerToggleCustomer: (state, action) => {
      state.headerDrawerToggleCustomer = action.payload;
    },
    setContentBackground: (state, action) => {
      state.contentBackground = action.payload;
    },

    setThemeConfiguratorToggle: (state, action) => {
      state.themeConfiguratorToggle = action.payload;
    },
    setFooterFixed: (state, action) => {
      state.footerFixed = action.payload;
    },
    setFooterShadow: (state, action) => {
      state.footerShadow = action.payload;
    },
    setFooterBgTransparent: (state, action) => {
      state.footerBgTransparent = action.payloadF;
    },
    setPageTitleStyle: (state, action) => {
      state.pageTitleStyle = action.payload;
    },
    setPageTitleBackground: (state, action) => {
      state.pageTitleBackground = action.payload;
    },
    setPageTitleShadow: (state, action) => {
      state.pageTitleShadow = action.payload;
    },
    setPageTitleIconBox: (state, action) => {
      state.pageTitleIconBox = action.payload;
    },
    setPageTitleDescription: (state, action) => {
      state.pageTitleDescription = action.payload;
    }
  }
});

export const {
  setSidebarFixed,
  setSidebarFooter,
  setSidebarShadow,
  setSidebarStyle,
  setSidebarToggle,
  setSidebarToggleMobile,
  setSidebarUserbox,
  setHeaderBgTransparent,
  setHeaderDrawerToggle,
  setHeaderFixed,
  setHeaderShadow,
  setHeaderSearchHover,
  setHeaderDrawerToggleCustomer,
  setFooterShadow,
  setContentBackground,
  setFooterBgTransparent,
  setFooterFixed,
  setPageTitleBackground,
  setPageTitleDescription,
  setPageTitleIconBox,
  setPageTitleShadow,
  setPageTitleStyle,
  setThemeConfiguratorToggle
} = themeOptionsSlice.actions;

export default themeOptionsSlice.reducer;
