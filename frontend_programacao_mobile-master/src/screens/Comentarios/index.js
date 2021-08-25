
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br')
import React from 'react';
import { Text, FlatList, StyleSheet, TextInput, View, Alert, Button } from "react-native";
import CardView from 'react-native-cardview';
import { ContenedorComentarios } from '../../assets/styles';

import { ComentarioService } from '../../services/comentarios.service';

const COMENTARIOS_POR_PAGINA = 5;

export default class Comentarios extends React.Component {

    comentarioService = new ComentarioService();

    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.params)
        this.state = {     
            producaoId: this.props.navigation.state.params.producaoId,       
            comentarios: [],
            proximaPagina: 0,
            textoNovoComentario: "",
            autor: "",
            carregando: false,
            atualizando: false,
            telaAdicaoVisivel: false
        }
    }

    componentDidMount() {
        this.carregarComentarios();
    }

    carregarComentarios = () => {
        const { producaoId, proximaPagina } = this.state;

        this.setState({
            carregando: true
        });

        const pagina = proximaPagina * COMENTARIOS_POR_PAGINA + 1;

        this.comentarioService.getByIdProducao(producaoId, pagina, COMENTARIOS_POR_PAGINA).then(res => {
            this.setState({
                proximaPagina: proximaPagina + 1,
                comentarios: [...res.data],

                atualizando: false,
                carregando: false
            });
        })
        .catch(e => {
            this.carregarComentarios();
        })
        .finally(() => {
            this.setState({
                atualizando: false,
                carregando: false
            })
        })
    }

    mostrarComentarios = () => {
            const { comentarios } = this.state;
            
            if(!comentarios || comentarios.length === 0) {
                return(<Text style={{textAlign: 'center', padding: 20, fontWeight: 'bold', fontSize: 16}}>Nenhum comentário</Text>)
            }

            return(          
                  <ContenedorComentarios>
                    <FlatList
                        data = {comentarios}
                        

                        onEndReached = { () => { this.carregarComentarios() } }
                        onEndReachedThreshold = { 0.1 }
                        vertical
                        ListFooterComponent={<View style={{height: 20}}/>}

                        keyExtractor = { (item) => String(item.id) }
                        renderItem={({item}) => {
                            return(
                                <View>
                                    <CardView style={styles.cardComentario}>                    
                                        <Text style={styles.cardAutor}>
                                            Publicado por {'\t'}
                                            <Text style={{padding: 10, fontWeight: 'bold'}} >{item.autor}</Text> {'\t'}
                                            em {'\t'}
                                            <Text style={{padding: 10, fontWeight: 'bold'}}>{this.formatDate(item.criado_em)}</Text> {'\t'}
                                        </Text>
                                            <Text style={styles.cardTexto}>{item.mensagem}</Text>
                                    </CardView>
                                </View>
                            )
                        }}
                        />
                </ContenedorComentarios>
            )

    }

    publicarComentario(e) {
        const { producaoId, autor, textoNovoComentario } = this.state;

        if(!autor || autor.trim() === '' || !textoNovoComentario || textoNovoComentario.trim() === '') {
            return Alert.alert('Atenção', 'Preencha todos os campos!');
        }

        this.comentarioService
        .publicarByIdProducao(producaoId, autor, textoNovoComentario)
        .then(res => {
            if(res.data === 'OK') {
                this.carregarComentarios();
                this.setState({
                    autor: '',
                    textoNovoComentario: '',
                })
            }
        })
        .catch(e => console.log(`Comentários: `, e));
    }

    formatDate( date ) {
        return dayjs(date).format('DD/MM/YYYY');
    }
    

    render = () => {
        return(
            <View style={styles.view}>   
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({autor: text})}
                    value={this.state.autor}
                    placeholder="Autor"
                />               
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({textoNovoComentario: text})}
                    value={this.state.textoNovoComentario}
                    placeholder="Comentário"
                />       
                <Button
                    style={styles.button}
                    title="Publicar"
                    onPress={(e) => this.publicarComentario(e)}
                />
                { this.mostrarComentarios() }
            </View>
        );
      
    }


}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    view: {
        marginTop: 50,
        flex: 1,
        height: '100%'
    },
    button: {
        margin: 12,
        padding: 10,
    },
    cardComentario: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
    },
    cardTexto: {
        marginVertical: 10,
        opacity: .5,
    },
    cardAutor: {
        fontSize: 15,
    }
  });

