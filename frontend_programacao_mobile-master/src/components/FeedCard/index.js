import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardContent } from 'react-native-cards';
import {
    Avatar,
    NomeEmpresa,
    Rua,
    EsquerdaDaMesmaLinha,
    Informações

} from "../../assets/styles";
import avatar from "../../assets/imgs/avinor.jpeg";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br')



export default class FeedCard extends React.Component{
constructor(props){
    super(props);
    this.state = {
        feed: this.props.feed,
        navegador: this.props.navegador
    }
}

componentDidMount() {
}

formatDate( date ) {
    return dayjs(date).format('dddd, D [de] MMMM [de] YYYY');
}

render = () => {
    const {feed, navegador} = this.state;
    return (
        <TouchableOpacity onPress={
            
            () => {
                navegador.navigate("Detalhes", { producao: feed})
            }
        }>
            <Card>
                <Avatar source={avatar}/>
                <NomeEmpresa>{feed.company}</NomeEmpresa>
                <CardContent>
                        <Rua>Rua {feed.rua} Galpão {feed.galpao}</Rua>
                        <EsquerdaDaMesmaLinha>
                        <Informações>Data de alojamento: {this.formatDate(feed.inicio_em)}</Informações>
                </EsquerdaDaMesmaLinha>
                <EsquerdaDaMesmaLinha>
                        <Informações>Quantidade: {feed.quantidade}</Informações>
                        <Informações>   Fornecedor: {feed.fornecedor}</Informações>
                        
                </EsquerdaDaMesmaLinha>   
                </CardContent>
            </Card>
        </TouchableOpacity>
        );
    }
}