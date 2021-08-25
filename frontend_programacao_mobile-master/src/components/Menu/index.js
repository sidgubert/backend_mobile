import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { RuaService } from '../../services/rua.service';
import avatar from '../../assets/imgs/avinor.jpeg';

import { Avatar, NomeEmpresa, ContenedorMenu, DivisorMenu, EsquerdaDaMesmaLinha } from "../../assets/styles";

export default class Menu extends React.Component {

    ruaService = new RuaService();

    constructor(props) {
        super(props)
        
        this.state = {
            atualizar: true, 
            filtrar: props.filtragem,
            ruas: []
        }

        this.getRuas();
    }

    getRuas() {
        this.ruaService.getAll().then(res => {
            this.setState({
                ruas: res.data
            })
        }).catch(e => {
            this.getRuas();
            console.log(`Menu: `, e)
        });
    }

    mostrarRua = (rua) => {
        const { filtrar } = this.state;

        return(
            <TouchableOpacity onPress={() => {
                filtrar(rua);
            }}>
                <DivisorMenu />
                <EsquerdaDaMesmaLinha>
                    <Avatar source={avatar} />
                    <NomeEmpresa>{rua.nome}</NomeEmpresa>
                </EsquerdaDaMesmaLinha>
            </TouchableOpacity>
        );
    }




    render = () => {
        if(!this.state.ruas || !this.state.ruas.length) {
            this.state.ruas = [];
        }
        
        return(
            <SafeAreaInsetsContext.Consumer>
                {insets => 
                    <ScrollView style={{ paddingTop: insets.top }}>
                        
                        <ContenedorMenu>
                            {this.state.ruas.map((rua) => this.mostrarRua(rua))}
                        </ContenedorMenu>
                    </ScrollView>
                }
            </SafeAreaInsetsContext.Consumer>
        );
    }

}