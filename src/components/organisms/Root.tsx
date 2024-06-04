import { Button, Flex, Grid, Layout, Drawer, theme, Typography } from 'antd'
import { DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';
import { Explore, EntendaMobile } from 'components/molecules'
import { ChevronDoubleDown, ChevronDoubleUp, Filter } from 'components/atoms'
import { Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import entenda from 'assets/data/entenda.json'

const { Content, Sider } = Layout
const { Text } = Typography
const { useBreakpoint } = Grid

export const Root = () => {
    const [ collapsed, setCollapsed ]  = useState(false)
    const [ entendaMobileOpen, setEntendaMobileOpen ] = useState(false)
    const breakpoints = useBreakpoint()
    const {
        token: {colorBgContainer},
    }  = theme.useToken()

    return (
        <Layout style={{minHeight: '100vh', maxHeight: '100%'}}>
            { !breakpoints.xs && (//sider aparecera ao lado esquerdo se e apenas se a tela nao for mobile
                <Sider breakpoint='xs' collapsible trigger={null} collapsed={collapsed} collapsedWidth={50} width={374} theme="light">
                    <Flex justify="space-between" align="center" style={{padding: "12px"}}>
                        <Flex gap={10}>
                            {!collapsed && (
                                <>
                                    <Filter/>
                                                                        
                                    <Text strong>Explore</Text>
                                </>
                            )}
                        </Flex>

                        <Button
                            type="text"
                            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined /> }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ float: 'right' }}                        
                        />
                    </Flex>

                    <Explore collapsed={collapsed}/>
                </Sider>
            )}

            { breakpoints.xs && ( //Drawer aparecera com os conteudos de Explore se e apenas se a tela for mobile
                <Flex style={{alignItems: 'center' , background: colorBgContainer, padding: '16px, 12px, 16px, 12px', height: '56px', lineHeight: '56px', borderRadius:'0 0 12px 12px'}}>
                    <Flex align='center' justify='flex-start'>
                        <Explore collapsed={true} vertical={false}/>
    
                        <Button
                            type="text"
                            icon={collapsed ?  <ChevronDoubleUp /> : <ChevronDoubleDown /> }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ float: 'right' }}                        
                        />
                    </Flex>                 
    
                    <Drawer
                        placement='top'
                        height='100%'
                        width='100%'
                        open={collapsed}
                        onClose={() => setCollapsed(!collapsed)}
                        closeIcon={collapsed ? (  
                            <ChevronDoubleUp/> 
                        ) : (
                            <ChevronDoubleDown/> 
                        )}
                    >
                        <Flex gap={10} style={{padding:'10px'}}>
                            <Filter/>

                            <Text strong > Explore </Text>
                        </Flex>

                        <Explore collapsed={!collapsed}/>
                    </Drawer>
                </Flex>
            )}

            <Layout style={{ display: 'flex', flexDirection: 'column', minHeight:'auto'}}>
                <Content style={{ display: 'flex', flex: 1 }}>
                    <div style={{ alignItems: 'center', display: 'flex', flex: 1, justifyContent: 'center' }}>
                        <Outlet />
                    </div>
                </Content>
             
                {breakpoints.xs && (
                    <Flex style={{ flexShrink: 0, minHeight: '112px', alignItems: 'center' , background: colorBgContainer, padding: '0px, 0px, 0px, 0px', lineHeight: '112px', borderRadius:'12px 12px 0px 0px'}}>
                        <Drawer
                            title={<Text strong style={{padding:'0 8px 0 24px'}}>Entenda</Text>}
                            placement='bottom'
                            open={entendaMobileOpen}
                            height='90%'
                            onClose={() => setEntendaMobileOpen(!entendaMobileOpen)}
                            closeIcon={entendaMobileOpen ? (
                                <ChevronDoubleDown/> 
                            ) : (
                                <ChevronDoubleUp/> 
                            )}
                        >
                            <p style={{padding:'0px 24px 0px 24px'}}>{entenda.main.header.description}</p>

                            <EntendaMobile/>
                        </Drawer>

                        <Flex vertical style={{minWidth:'376px', minHeight:'112px', padding:'0 0 0 8px'}}>
                            <Flex align='center' justify='space-between' style={{minHeight:'52px', padding:'16px 8px 16px 0'}}>
                                <Text strong style={{padding:'8px 8px 0 16px'}}>Entenda</Text>

                                <Button
                                    type="text"
                                    icon={entendaMobileOpen ?  <ChevronDoubleDown/>  : <ChevronDoubleUp /> }
                                    onClick={(() => setEntendaMobileOpen(!entendaMobileOpen))}
                                    style={{ float: 'right' }}                        
                                />
                            </Flex>

                            <Text style={{minHeight:'60px', padding:'0px 16px 8px 16px'}}>{entenda.main.header.description}</Text>
                        </Flex>
                    </Flex>
                )}
            </Layout>
        </Layout>    
    )
}
