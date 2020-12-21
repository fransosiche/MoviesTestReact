// Components/FilmDetail.js

import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from "../API/TMBDApi";
import moment from "moment";
import numeral from 'numeral';
import {connect} from 'react-redux'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _toggleFavorite() {
        const action = {type: "TOGGLE_FAVORITE", value: this.state.film}
        this.props.dispatch(action)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.favoritesFilm);
    }

    _displayFavoriteImage() {
        var SourceImage = require('../Images/iic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            SourceImage = require('../Images/iic_favorite.png')
        }
        return (
            <Image source={SourceImage}
                   style={styles.favorite_image}
            />
        )
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            console.log(film.backdrop_path)
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.overview}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti
                        le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>

                </ScrollView>
            )
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 0,
    },
    image: {
        height: 169,
        margin: 5
    },
    overview: {
        fontSize: 12,
        textAlign: 'center'
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilmDetail)