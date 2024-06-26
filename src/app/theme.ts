import { theme } from 'antd'

export const customTheme = {
  //Tokens = Global tokens modificar de um vai modificar todos os componentes
   // 1. Use dark algorithm
   //algorithm: theme.darkAlgorithm,
   // 2. Combine dark algorithm and compact algorithm
   // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    token: {
      algorithm: theme.compactAlgorithm,
      // Seed Token
      colorPrimary: '#0C4921',
      borderRadius: 10,
      // Alias Token
      colorBgContainer: '#f5f4f0',
      colorFill: '#F5F4F0',
      fontFamily: "Avenir",


    },
    //componentes
    components:{
      Button:{
        fontWeight: 'bold',
        defaultBg: '#FFFFFF',
        defaultColor: '#555555',
      },
      Select:{
        colorBorder: '#999999',
        colorText: '#555555',
        colorTextPlaceholder: '#555555',
        optionSelectedBg: '#F5F4F0',
        selectorBg: '#FFFFFF',
      },
      Drawer:{
        paddingLG: 0,
      }
    },
}
