import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  TextInput,
  TouchableHighlight,
} from "react-native";
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import Loading from 'react-native-whc-loading'

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataPekerjaan: ['Pelajar', 'Pegawai Swasta', 'PNS'],
      dataJK:[
        {label: 'Pria', value: 0 },
        {label: 'Wanita', value: 1 }
      ],
      formData:{
        nama: '',
        jk: 0,
        tgl_lahir: null,
        email: '',
        telp: '',
        pekerjaan: 'pelajar',
      }
    }
  }
  render() {
    const {nama, tgl_lahir, email, telp, pekerjaan} = this.state.formData;
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} enabled>
          <View style={styles.row}>
            <Text style={styles.label}>Nama</Text>
            <TextInput
              style={styles.txtInput}
              underlineColorAndroid="blue"
              onChangeText={nama => 
                this.setState(prevState =>({
                  formData: {
                    ...prevState.formData,
                    nama
                  }
                }))
              }
              value={nama}
            />
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, {marginBottom:10}]}>Jenis Kelamin</Text>
            <RadioForm
              radio_props={this.state.dataJK}
              initial={0}
              formHorizontal={true}
              labelHorizontal={true}
              labelStyle={{paddingRight: 20}}
              buttonColor={'#2196f3'}
              animation={true}
              onPress={jk => 
                this.setState(prevState =>({
                  formData: {
                    ...prevState.formData,
                    jk
                  }
                }))
              }
            />
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, {marginBottom:10}]}>Tanggal Lahir</Text>
            <DatePicker
              style={{width: "100%"}}
              date={tgl_lahir}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="19-05-1501"
              maxDate="20-06-3011"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0
                },
              }}
              onDateChange={(tgl_lahir) => 
                this.setState(prevState => ({
                  formData: {
                    ...prevState.formData,
                    tgl_lahir
                  }
                }))
              }
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.txtInput}
              underlineColorAndroid="blue"
              keyboardType="email-address"
              onChangeText={email => 
                this.setState(prevState =>({
                  formData: {
                    ...prevState.formData,
                    email
                  }
                }))
              }
              value={email}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>No. Telpon</Text>
            <TextInput
              style={styles.txtInput}
              underlineColorAndroid="blue"
              keyboardType="phone-pad"
              onChangeText={telp => 
                this.setState(prevState =>({
                  formData: {
                    ...prevState.formData,
                    telp
                  }
                }))
              }
              value={telp}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pekerjaan</Text>
            <Picker
              selectedValue={pekerjaan}
              style={{ height: 50}}
              onValueChange={pekerjaan => 
                this.setState(prevState => ({
                  formData: {
                    ...prevState.formData,
                    pekerjaan
                  }
                }))
              }
            >
            {
              this.state.dataPekerjaan.map((item, index)=>(
                <Picker.Item 
                  key={index}
                  label={item} 
                  value={item.toLocaleLowerCase()}
                  />
              ))
            }
            </Picker>
          </View>
          <Text style={styles.label}>{JSON.stringify(this.state.formData)}</Text>
          <View style={styles.row}>
            <TouchableHighlight 
              style={styles.btnContainer}
              onPress = {this._savedata}
            >
              <Text style={styles.txtButton}>Simpan</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
        <Loading ref="loading"/>
      </ScrollView>
    );
  }
  _savedata = async () => {

    this.refs.loading.show();
    try {
      //https://api.backendless.com/CF3C06D3-20E3-344C-FF85-0ABC2E86BD00/C641F582-C12F-A45B-FF47-3F3271092B00/data/people
      //"http://192.168.43.228/react-native-services/service_crud_php.php
        await fetch("https://api.backendless.com/CF3C06D3-20E3-344C-FF85-0ABC2E86BD00/C641F582-C12F-A45B-FF47-3F3271092B00/data/people",{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.formData),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //return responseJson.movies;
        setTimeout(() => {
          this.refs.loading.close();
          alert(JSON.stringify(responseJson));
        }, 2000)
      })
      .catch((error) => {
        this.refs.loading.close();
        console.error(error);
      });
    } catch (error) {
      this.refs.loading.close();
      alert(error)
    }
  };
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  row: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20
  },
  btnContainer: {
    backgroundColor: '#1A8',
    padding: 10,
    alignItems: 'center'
  },
  txtButton: {
    fontSize: 20,
    color: 'white'
  },
  txtInput: {
    height: 40, 
  },
});