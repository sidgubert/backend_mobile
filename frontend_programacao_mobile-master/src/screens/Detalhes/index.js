import React  from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import CardView from 'react-native-cardview';
import { NomeEmpresa, Rua, Informações, EsquerdaDaMesmaLinha } from '../../assets/styles.js';
import Icon from 'react-native-vector-icons/AntDesign';

import slide1 from '../../assets/imgs/slide1.jpg';
import slide2 from '../../assets/imgs/slide2.jpg';
import slide3 from '../../assets/imgs/slide3.jpg';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br')

export default class Detalhes extends React.Component {
    

    constructor(props) {
        super(props);

        this.state = {
            producao: this.props.navigation.state.params.producao
        }
    }

    formatDate( date ) {
        return dayjs(date).format('dddd, D [de] MMMM [de] YYYY');
    }

    mostrarSlides = () => {
        const slides = [ slide1, slide2, slide3 ];

        return(
            <SliderBox
                dotColor={"#ffad05"}
                inactiveDotColor={"#5995ed"}

                resizeMethod={"resize"}
                resizeMode={"cover"}

                dotStyle={{
                    width: 15,
                    height: 15, 

                    borderRadius: 15,
                    marginHorizontal: 5
                }}
                
                images={slides} />
        )
    }
    render = () => {
        const { producao } = this.state;
       
        if (producao){
            return(
                
                <CardView
                    cardElevation={2}
                    cornerRadius={0}>
                    {this.mostrarSlides() }
                    <NomeEmpresa>{producao.company}</NomeEmpresa>
                    <Rua>{producao.rua} {producao.galpao}</Rua>
                    <Informações>Quantidade Alojada: {producao.quantidade}</Informações>
                    <Informações>Mortalidade: {producao.mortalidade}</Informações>
                    <Informações>Descrição: {`${producao.descricao}`}</Informações>
                    <Informações>Data Alojamento: {this.formatDate(producao.inicio_em)}</Informações>
                    <Informações>Fornecedor: {producao.fornecedor}</Informações>
                    <Informações>Resoponsável Técnico: {producao.responsavel}</Informações>
                    <EsquerdaDaMesmaLinha>
                            
                    <Icon name="message1" size={26} onPress={
                                    () => {
                                        this.props.navigation.navigate("Comentarios",
                                            { producaoId: producao.id })
                                    }
                                }/>
                                </ EsquerdaDaMesmaLinha>
     
                </CardView>
                
        
            );

        }else {
            return(null);
        }
    }
}