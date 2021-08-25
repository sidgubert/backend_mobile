import React from 'react';
import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import { View, FlatList } from 'react-native';
import FeedCard from '../../components/FeedCard';
import { Header } from 'react-native-elements';
import DrawerLayout from 'react-native-drawer-layout';
import  Icon  from 'react-native-vector-icons/AntDesign';
import Menu from '../../components/Menu';
import { ProducaoService } from '../../services/producao.service';

import { EntradaNomeProduto, CentralizadoNaMesmaLinha } from '../../assets/styles';


const FEEDS_POR_PAGINA = 3;

export default class Feeds extends React.Component{

    producaoService = new ProducaoService();

    constructor (props) {
        super(props);

        this.filtrarPorRua = this.filtrarPorRua.bind(this);

        this.state = {
            proximaPagina : 0,
            feeds: [],
            atualizando: false,
            fornecedor: '',
            carregando: false,
            rua: null,
        };
    }

    componentDidMount() {
        this.getProducoes();
    }

    getProducoes() {
        const {  proximaPagina, feeds, fornecedor, ruaEscolhida } = this.state;
        
        this.setState({
            carregando : true,
            atualizando: true
        });

        this.producaoService.getAll({
            fornecedor: fornecedor && fornecedor.length >= 3 ? fornecedor : null,
            rua: ruaEscolhida && ruaEscolhida.nome ? ruaEscolhida.nome : null,
            page: proximaPagina,
            limit: FEEDS_POR_PAGINA
        }).then(res => {
            this.setState({
                feeds: res.data || []
            })
        }).catch(e => {
            console.log(`Feeds: `, e.data)
            this.getProducoes();
        }).finally(() => {
            setTimeout(() => {
                this.setState({
                    carregando : false,                
                    atualizando: false, 
                });
            }, 1000)

        });
    }

    atualizar = () => {
        this.setState({
            atualizando: true, 
            feeds: [], 
            proximaPagina: 0, 
            fornecedor: null,
            ruaEscolhida: null
        }, () => { this.getProducoes(); });
    }

    mostrarFeed = (feed) => {       
        return(
            <FeedCard key={feed.id} feed = {feed} navegador={this.props.navigation}/>
        );

    }

    atualizarNomeFornecedor = (nome) => {
        this.setState({            
            fornecedor: nome,
            ruaEscolhida: null
        })
        this.getProducoes();
    }

    mostrarBarraPesquisa = () => {
        const {fornecedor} = this.state;

        return(
            <CentralizadoNaMesmaLinha>
                <EntradaNomeProduto
                onChangeText={(nome) => {this.atualizarNomeFornecedor(nome)}}
                    value={fornecedor}>
                    
                </EntradaNomeProduto>
                <Icon style={{ padding: 8 }} size={20} name="search1"
                    onPress={
                        () => {
                            this.setState({feeds: []});
                            this.getProducoes();
                        }  
                    }> </Icon>
            
             </CentralizadoNaMesmaLinha>
        )
    }

    mostraMenu = () => {
        
        this.menu.openDrawer();

    }

    filtrarPorRua = (rua) => {
        this.setState({
            ruaEscolhida: rua,
            fornecedor: '',
            proximaPagina: 1,
        }, () => {
            this.getProducoes();
        })

        this.menu.closeDrawer();
    }

    mostrarFeeds = (feeds) => {
        const { atualizando } = this.state;
        return(
            <DrawerLayout
                drawerWidth={250}
                drawerPosition={DrawerLayout.positions.Left}

                ref={drawerElement => {
                    this.menu = drawerElement
                }}
                renderNavigationView={()=> <Menu filtragem={this.filtrarPorRua}/>}
                
                >
                <Header
                    leftComponent={
                        <Icon size={28} name="menuunfold" onPress={() => {
                            this.mostraMenu();
                            
                        }} />
                    }

                    centerComponent={

                        this.mostrarBarraPesquisa()

                    }
                    rightComponent={
                        <></>

                    }
                >

                </Header>
                    <FlatList
                    data={feeds}

                    numColumns={1}
                    onEndReached = {() => this.getProducoes()}
                    onEndReachedThreshold = {0.1}
                    onRefresh={() => this.atualizar()}
                    refreshing={atualizando}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({item}) => {
                        return(
                            <View style={{width: '100%'}}>
                                    {this.mostrarFeed(item)}

                            </View>
                        )
                    }}
                    >
                    </FlatList>
            </DrawerLayout>
        );
    }
    render = () => {
        const {feeds} = this.state;
        return (this.mostrarFeeds(feeds))
    }
}