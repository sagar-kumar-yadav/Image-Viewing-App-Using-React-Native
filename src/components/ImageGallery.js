// ImageGallery.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const API_KEY = "c5Ei8OdNCvL81PBWNls2sXxQK7kXUJ7DBTwKuXpQhDf6XQVNdaNEQgCt";

const ImageGallery = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page]);

  const fetchImages = async () => {
    try {
      const url = `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`;

      const data = await axios.get(url, {
        headers: {
          Authorization: API_KEY,
        },
      });

      setImages(data.data.photos);
      console.log(data.data.photos);
    } catch (error) {
      console.error("Error in  fetching images", error);
    }
  };

  const loadMoreImages = () => {
    setPage(page + 1);
  };

  const renderImageItem = ({ item }) => (
    <Image style={styles.image} source={{ uri: item.src.medium }} />
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>
        Image Search App
      </Text>
      <StatusBar backgroundColor="red" />
      <TextInput
        style={styles.input}
        placeholder="Enter image type"
        onChangeText={(text) => setQuery(text)}
      />
      <View style={styles.search}>
        <TouchableOpacity style={styles.button} onPress={() => setPage(1)}>
          <Text style={{ color: "white" }}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderImageItem}
        onEndReached={hasMore ? loadMoreImages : null}
        onEndReachedThreshold={0.5}
        style={{ borderRadius: 20 }}
      />

      {hasMore && (
        <View style={styles.pagination}>
          <TouchableOpacity style={styles.button} onPress={loadMoreImages}>
            <Text style={{ color: "white" }}>Show More</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  search: {
    // backgroundColor:
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
  },
  pagination: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageGallery;
