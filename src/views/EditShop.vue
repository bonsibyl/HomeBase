<template>
  <v-app>
    <div id="sheet">
      <v-sheet rounded="sm" width="95vw" elevation="1">
        <div id ="content">
        <v-row id="row1" >
            <v-col cols="auto" id="imgupload">
              <v-col>
                <v-file-input 
                prepend-icon="mdi-camera" 
                accept="image/png, image/jpeg," 
                v-model="image" 
                placeholder="Upload A Photo" 
                dense 
                hide-details
                solo
                type="file" 
                class="input" 
                @change="onUpload" 
                outlined
                 />
              </v-col>
                <v-col  class="pt-0">
                <v-img :src="imageUrl" style="border: 1px dashed #ccc; min-height: 420px; max-height:420px; min-width:660px; max-width:660px;" />
                </v-col>
            </v-col>
            <v-col id="hours">
              <v-row class="hourrow">
                <v-col class="pt-0">
                <h1 class="font-weight-bold">Operating Hours:</h1>
                </v-col>
                <v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols=4>
              <h3 class="text--secondary">Monday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0" >
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="hours.mon"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols=4>
                <h3 class="text--secondary">Tuesday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="hours.tues"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols=4>
                <h3 class="text--secondary">Wednesday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="hours.wed"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols=4>
                <h3 class="text--secondary">Thursday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="hours.thurs"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols=4>
                <h3 class="text--secondary">Friday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="hours.fri"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols=4>
                <h3 class="text--secondary">Saturday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="hours.sat"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-0" cols=4>
                <h3 class="text--secondary">Sunday:</h3>
                </v-col>
                <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="hours.sun"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            </v-row>
        <v-row id="row2"> 
          <v-col>
            <v-row>
              <v-col class="pb-0 pt-0">
                <h3 class="font-weight-bold ">Shop Name:</h3>
              </v-col>
              <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="shop.name"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
            </v-row>
            <v-spacer/>
            <v-row>
              <v-col class="pb-0 pt-0">
                <h3 class="font-weight-bold">Contact Number:</h3>
              </v-col>
              <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="shop.number"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-col class="pb-0 pt-0 ml-6">
                <h3 class="font-weight-bold">Business Email:</h3>
              </v-col>
              <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="shop.email"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
            </v-row>
            <v-spacer/>
            <v-row>
              <v-col class="pb-0 pt-0 ml-6">
                <h3 class="font-weight-bold">Address:</h3>
              </v-col>
              <v-col class="pb-0 pt-0">
                <v-text-field
                  filled
                  rounded
                  dense
                  :value="shop.address"
                  required
                  full-width
                  ></v-text-field>
                </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row id="row3"> </v-row>
        </div>
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "EditShop",
  data() {
    return {
      image: undefined,
      imageUrl: '',
      hours: {
        mon: "10:00am - 6.30pm",
        tues: "10:00am - 6.30pm",
        wed: "10:00am - 6.30pm",
        thurs: "10:00am - 6.30pm",
        fri: "10:00am - 6.30pm",
        sat: "-",
        sun: "-",
      },
      shop: {
        name: "Simply Cakery",
        number:"+65 8234 1866",
        email:"simple.cakery@gmail.com",
        address:"8 College Ave East",
      }
    };
  },
  methods: {
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onUpload(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    }
  }
};
</script>

<style>
#sheet {
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vh;
}
#content {
  margin: 0 5vw 0 5vw;
}
#hours {
  margin-top:1vh;
}

</style>
