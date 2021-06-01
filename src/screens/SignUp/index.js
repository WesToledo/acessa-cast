import React, { useEffect, useState } from "react";
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

export const SignUpScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: null,
    password: null,
    name: null,
    password_confirm: null,
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [shouldCaptionRender, setShouldCaptionRender] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const checkPassword = () => {
    if (form.password !== form.password_confirm) {
      setShouldCaptionRender(true);
    }
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        <Icon name="alert-circle-outline" style={styles.captionIcon} />
        <Text style={styles.captionText}>Senhas não coincidem</Text>
      </View>
    );
  };

  function handleSubmit() {
    checkPassword();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Layout style={styles.content}>
          <View style={styles.header}>
            <Text category="h4" style={styles.text}>
              Crie sua conta
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              style={styles.input}
              value={form.name}
              label="Nome"
              placeholder="Digite seu nome"
              onChangeText={(nextValue) =>
                setForm({ ...form, name: nextValue })
              }
            />
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
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) =>
                setForm({ ...form, password: nextValue })
              }
            />
            <Input
              style={styles.input}
              value={form.password_confirm}
              label="Confirme sua senha"
              placeholder="Digite sua senha novamente"
              accessoryRight={renderIcon}
              status={shouldCaptionRender ? "danger" : "basic"}
              renderCaption={renderCaption}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) =>
                setForm({ ...form, password_confirm: nextValue })
              }
            />
            <Button style={styles.button} size="medium" onPress={handleSubmit}>
              Entrar
            </Button>
          </View>
        </Layout>
      </KeyboardAvoidingView>
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
    width: "95%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
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
    color: "red",
  },
  form: {
    paddingHorizontal: 15,
    width: "100%",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 15,
    // marginBottom: 15,
  },
});
