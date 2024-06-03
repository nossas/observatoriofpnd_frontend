import { Button, Flex, Grid, Layout, Drawer, theme, Typography } from 'antd'
import { DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';
import { Explore, EntendaMobile } from 'components/molecules'
import { ChevronDoubleDown, ChevronDoubleUp, Filter } from 'components/atoms'
import { Outlet } from '@tanstack/react-router'
import { useState } from 'react'

const { Content, Sider } = Layout

const { useBreakpoint } = Grid

const { Text } = Typography

export const Root = () => {
    const [ collapsed, setCollapsed ]  = useState(false)
    const [entendaMobileOpen, setEntendaMobileOpen] = useState(false)
    const breakpoints = useBreakpoint()
    const {
        token: {colorBgContainer},
    }  = theme.useToken()

    return (
        <Layout style={{minHeight: '100vh', maxHeight: '100%'}}>
            
            { //sider aparecera ao lado esquerdo se e apenas se a tela nao for mobile
                !breakpoints.xs 
                    && 
                <Sider breakpoint='xs' collapsible trigger={null} collapsed={collapsed} collapsedWidth={50} width={374} theme="light">
                    <Flex justify="space-between" align="center" style={{padding: "12px"}}>
                        <Flex gap={10}>
                            {!collapsed &&
                                <>
                                    <Filter/>
                                    <Text strong>Explore</Text>
                                </>
                            }
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
            }
            {   //Drawer aparecera com os conteudos de Explore se e apenas se a tela for mobile
                        breakpoints.xs 
                            &&
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
                                closeIcon={
                                    collapsed ?  
                                    <ChevronDoubleUp/> 
                                    : <ChevronDoubleDown/> 
                                }
                            >
                                <Flex gap={10} style={{padding:'10px'}}>
                                    <Filter/>
                                    <Text strong > Explore </Text>
                                </Flex>
                                <Explore collapsed={!collapsed}/>
                            </Drawer>
                        </Flex>

                    }
            <Layout style={{ display: 'flex', flexDirection: 'column', minHeight:'auto'}}>
                <Content style={{ display: 'flex', flex: 1 }}>
                    <div style={{ alignItems: 'center', display: 'flex', flex: 1, justifyContent: 'center' }}>
                        <Outlet />
                    </div>
                </Content>
                {breakpoints.xs && (
                    <Flex style={{alignItems: 'center' , background: colorBgContainer, padding: '0px, 0px, 0px, 8px', minHeight: '112px', lineHeight: '112px', borderRadius:'12px 12px 0px 0px'}}>
                        <Drawer
                            title='Entenda'
                            placement='bottom'
                            open={entendaMobileOpen}
                            height='90%'
                            onClose={() => setEntendaMobileOpen(!entendaMobileOpen)}
                            closeIcon={
                                entendaMobileOpen ?  
                                <ChevronDoubleDown/> 
                                :
                                <ChevronDoubleUp/> 
                            }
                        >
                            <p>FPND são áreas de florestas dentro de glebas públicas ainda não destinadas</p>
                            <EntendaMobile/>
                        </Drawer>
                        <Flex vertical style={{minWidth:'376px', minHeight:'112px', padding:'0 0 0 8px'}}>
                            <Flex align='center' justify='space-between' style={{minHeight:'52px', padding:'16px 8px 16px 0'}}>
                                <Text strong style={{padding:'0 8px 0 8px'}}>Entenda</Text>
                                <Button
                                    type="text"
                                    icon={entendaMobileOpen ?  <ChevronDoubleDown/>  : <ChevronDoubleUp /> }
                                    onClick={(() => setEntendaMobileOpen(!entendaMobileOpen))}
                                    style={{ float: 'right' }}                        
                                />
                            </Flex>
                            <Text style={{minHeight:'60px', padding:'0 24px 24px 8px'}}>FPND são áreas de florestas dentro de glebas públicas ainda não destinadas</Text>
                        </Flex>
                    </Flex>
            )}
            </Layout>

        </Layout>
    
)
}
