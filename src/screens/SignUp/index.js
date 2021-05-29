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

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export const SignUpScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: null,
    password: null,
    name: null,
    password_confirm: null,
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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

  useEffect(() => {
    console.log(form);
  }, [form]);

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
              caption={renderCaption}
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
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) =>
                setForm({ ...form, password_confirm: nextValue })
              }
            />
            <Button style={styles.button} size="medium">
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
    backgroundColor: "#1F2876",
  },
  text: {
    padding: 10,
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#fff",
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
    color: "#8F9BB3",
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
