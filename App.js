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
        jk: '',
        tgl_lahir: null,
        email: '',
        telp: '',
        pekerjaan: 'pelajar',
      }
    }
  }
  render() {

    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} enabled>
          <View style={styles.row}>
            <Text style={styles.label}>Nama</Text>
            <TextInput
              style={styles.txtInput}
              underlineColorAndroid="blue"
              //onChangeText={(text) => this.setState({text})}
              //value={this.state.text}
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
              //onPress={(value) => {this.setState({value:value})}}
            />
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, {marginBottom:10}]}>Tanggal Lahir</Text>
            <DatePicker
              style={{width: "100%"}}
              //date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="1909-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  //marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              //onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.txtInput}
              underlineColorAndroid="blue"
              keyboardType="email-address"
              //onChangeText={(text) => this.setState({text})}
              //value={this.state.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>No. Telpon</Text>
            <TextInput
              style={styles.txtInput}
              underlineColorAndroid="blue"
              keyboardType="phone-pad"
              //onChangeText={(text) => this.setState({text})}
              //value={this.state.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pekerjaan</Text>
            <Picker
              //selectedValue={this.state.language}
              style={{ height: 50}}
              //onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
            >
            {
              this.state.dataPekerjaan.map((item, index)=>(
                <Picker.Item key={index} label={item} value={item.toLocaleLowerCase()}/>
              ))
            }
            </Picker>
          </View>
          <View style={styles.row}>
            <TouchableHighlight 
              style={styles.btnContainer}
              onPress = {this._savedata}
            >
              <Text style={styles.txtButton}>Simpan</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
  _savedata = ()=>{
    alert(JSON.stringify(this.state.formData));
  }
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