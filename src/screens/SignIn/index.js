import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  Button,
  Divider,
  Layout,
  Text,
  Input,
  Icon,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";

import { login } from "src/store/actions/auth";
import api from "src/services/api";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const avatarImg = require("src/assets/thumb.jpg");

var width = Dimensions.get("window").width;

export const SignInScreen = ({ navigation }) => {
  const [form, setForm] = React.useState({
    email: null,
    password: null,
  });
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Deve conter pelo menos 8 caracteres
        </Text>
      </View>
    );
  };

  async function handleSubmit() {
    try {
      const response = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      dispatch(
        login({
          ...response.data.user,
        })
      );
    } catch (err) {
      console.log("ERRO AO LOGAR", err);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <KeyboardAvoidingView behavior="height" style={styles.content}>
          <View style={styles.header}>
            <Image source={avatarImg} style={styles.avatar} />
            <Text category="h4" style={styles.text}>
              Acessa Cast
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              style={styles.input}
              value={form.email}
              label="Email"
              placeholder="Digite seu email"
              onChangeText={(nextValue) =>
                setForm({ ...form, email: nextValue })
              }
            />
            <Input
              style={styles.input}
              value={form.password}
              label="Senha"
              placeholder="Digite sua senha"
              caption={renderCaption}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) =>
                setForm({ ...form, password: nextValue })
              }
            />
            <Text
              category="s1"
              style={styles.singup}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              Novo por aqui? Crie sua conta
            </Text>
            <Button style={styles.button} size="medium" onPress={handleSubmit}>
              Entrar
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#02C497",
  },
  text: {
    padding: 10,
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#222b45",
    borderRadius: 5,
    width: "90%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    height: "1%",
    alignItems: "center",
    marginBottom: "5%",
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    marginTop: "-20%",
    borderRadius: 100,
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#02C497",
  },
  form: {
    marginTop: 40,
    padding: 15,
    width: "100%",
  },
  input: {
    marginVertical: 8,
  },
  singup: {
    alignSelf: "flex-end",
    color: "#02C497",
  },
  button: {
    marginTop: 15,
    // marginBottom: 15,
  },
});
