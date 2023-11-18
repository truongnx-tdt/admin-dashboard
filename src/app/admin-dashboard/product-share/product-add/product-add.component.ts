import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DATA_ROM, DATA_SCREEN } from '../product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  /**
   *
   */
  formCreateNew: any;
  constructor(public dialogRef: MatDialogRef<ProductAddComponent>, private formBuilder: FormBuilder, private toastr: ToastrService, private productService: ProductService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formCreateNew = this.formBuilder.group({
      productName: this.formBuilder.control('', Validators.required),
      price: this.formBuilder.control('0', Validators.compose([Validators.required])),
      priceSell: this.formBuilder.control('0'),
      description: this.formBuilder.control('', Validators.required),
      productionDate: this.formBuilder.control(new Date(), Validators.compose([Validators.required])),
      productQuantity: this.formBuilder.control('0', Validators.required),
      productStatus: this.formBuilder.control('', Validators.required),
      productCategoryId: this.formBuilder.control('', Validators.required),
      productBrand: this.formBuilder.control('', Validators.required),
      imageProducts: this.formBuilder.control(['']),
      chipProduct: '',
      ramProduct: '',
      romProduct: '',
      screenProduct: '',
    });
  }

  actualDateFormGroup = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split("T")[0];

  onMyDateChange(event: any) {
    this.formCreateNew.patchValue({ myDate: event.target.value });
  }

  // click send request
  processCreate() {
    if (this.formCreateNew.valid && this.formCreateNew.get('price').value >= 0 && this.formCreateNew.get('productQuantity').value >= 0) {
      if (this.formCreateNew.get('priceSell').value < 0) {
        this.toastr.error('Giá khuyến mãi phải >= 0')
      }
      else if (this.selectedImages.length == 0) { this.toastr.error('Chọn ảnh cho sản phẩm') }
      else {
        if (!this.validateFileExtension(this.formCreateNew.get('imageProducts').value)) {
          console.log(this.formCreateNew.value)
          const formData = new FormData();
          Object.keys(this.formCreateNew.value).forEach(key => {
            if (this.formCreateNew.value[key] !== null && this.formCreateNew.value[key] !== undefined) {
              if (key === 'imageProducts') {
                for (let i = 0; i < this.formCreateNew.value[key].length; i++) {
                  formData.append(key, this.formCreateNew.value[key][i]);
                }
              }
              else if (key === 'productionDate') { formData.append(key, formatDate(this.formCreateNew.value[key], 'dd-MM-yyyy', 'en-US')); }
              else {
                formData.append(key, this.formCreateNew.value[key]);
              }
            }
          });
          this.productService.createProduct(formData).subscribe(res => {
            console.log(res)
            this.toastr.success("Thêm thành công sản phẩm mới!")
          }, error => {
            console.log(error)
            this.toastr.error("Có lỗi xảy ra trong quá trình tạo mới!")
          })
        }
        else {
          this.toastr.error("file không đúng định dạng");
        }
      }
    }
    else {
      if (this.formCreateNew.get('productName').hasError('required')) {
        this.toastr.error("Yêu cầu nhập tên sản phẩm");
      }
      else if (this.formCreateNew.get('price').hasError('required')) {
        this.toastr.error("Nhập đúng giá sản phẩm");
      }
      else if (this.formCreateNew.get('description').hasError('required')) {
        this.toastr.error("Cần nhập mô tả sản phẩm");
      }
      else if (this.formCreateNew.get('productionDate').hasError('required')) {
        this.toastr.error("Nhập ngày sản xuất");
      }
      else if (this.formCreateNew.get('productQuantity').hasError('required')) {
        this.toastr.error("Cần nhập số lượng");
      }
      else if (this.formCreateNew.get('productStatus').hasError('required')) {
        this.toastr.error("Tình trạng sản phẩm");
      }
      else if (this.formCreateNew.get('productCategoryId').hasError('required')) {
        this.toastr.error("Chọn loại sản phẩm");
      }
      else if (this.formCreateNew.get('productBrand').hasError('required')) {
        this.toastr.error("Chọn hãng sản xuất");
      }
      else {
        this.toastr.error("Có trường nhập không đúng định dạng");
      }
    }
  }


  //#region config select img
  selectedImages: Array<string | ArrayBuffer | null> = [];

  onImagesSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files) {
      // Lặp qua danh sách các tệp hình ảnh và đọc dữ liệu của chúng
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImages.push(reader.result);
        };
        reader.readAsDataURL(files[i]);
      }

      // const imageNames: string[] = [];

      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   imageNames.push(file.name);
      // }
      this.formCreateNew.get('imageProducts')?.setValue(files);
    }
  }

  removeImage(index: number): void {
    // Tạo bản sao của mảng imageFileNames
    const updatedFileNames = [...this.formCreateNew.get('imageProducts')?.value]; // sử dụng spread ... để phân rã thành array mới

    // Loại bỏ tên file tại index khỏi bản sao
    updatedFileNames.splice(index, 1);

    // Gán bản sao đã cập nhật lại cho imageProducts trên form
    this.formCreateNew.get('imageProducts')?.setValue(updatedFileNames);

    // Loại bỏ hình ảnh tại index khỏi mảng selectedImages
    this.selectedImages.splice(index, 1);
  }

  validateFileExtension(file: any) {
    const fileType: string[] = [];
    for (let i = 0; i < file.length; i++) {
      const fileT = file[i];
      fileType.push(fileT.name.split('.').pop());
    }
    return fileType.some(type => !['jpg', 'png'].includes(type));
  }
  //#endregion


  closePopUp() {
    this.dialogRef.close();
  }
  DATA_BRAND_DT = [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'xiaomi', label: 'Xiaomi' },
    { value: 'oppo', label: 'OPPO' },
    { value: 'tecno', label: 'TECNO' },
    { value: 'nokia', label: 'Nokia' },
    { value: 'realme', label: 'realme' },
    { value: 'vivo', label: 'Vivo' },
    { value: 'honor', label: 'HONOR' },
    { value: 'htc', label: 'HTC' },
    { value: 'infinix', label: 'Infinix' },
    { value: 'rog', label: 'ROG' },
    { value: 'nubia', label: 'Nubia' },
    { value: 'xor', label: 'XOR' },
    { value: 'masstel', label: 'Masstel' },
    { value: 'tcl', label: 'TCL' },
    { value: 'itel', label: 'Itel' },
    { value: 'lg', label: 'LG' },
  ];

  // config for text editor
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '20rem',
    maxHeight: '20rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  // chip apple
  DATA_CHIP_APPLE = [
    { value: "apple-a17-pro", label: "Apple A17 Pro" },
    { value: "apple-a16-bionic", label: "Apple A16 Bionic" },
    { value: "apple-a15-bionic", label: "Apple A15 Bionic" },
    { value: "apple-a14-bionic", label: "Apple A14 Bionic" },
    { value: "apple-a13-bionic", label: "Apple A13 Bionic" },
    { value: "apple-a12-bionic", label: "Apple A12 Bionic" },
  ];
  // chip orther product
  DATA_CHIP = [
    'Qualcomm Snapdragon 8 Gen 3',
    'Dimensity 9200 Plus97',
    'Snapdragon 8 Gen 2',
    'MediaTek Dimensity 9200',
    'Qualcomm Snapdragon 8 Plus Gen 1',
    'Google Tensor G3',
    'MediaTek Dimensity 9000 Plus',
    'Snapdragon 7 Plus Gen 2',
    'Qualcomm Snapdragon 8 Gen 1',
    'MediaTek Dimensity 9000',
    'Samsung Exynos 2200',
    'Google Tensor',
    'Qualcomm Snapdragon 888 Plus',
    'Kirin 9000',
    'Qualcomm Snapdragon ',
    'Dimensity 8200',
    'Samsung Exynos 2100',
    'Google Tensor G2',
    'MediaTek Dimensity 8100',
    'MediaTek Dimensity 1300',
    'MediaTek Dimensity 1100',
    'Qualcomm Snapdragon 865 Plus',
    'MediaTek Dimensity 7200 Ultra',
    'Dimensity 8020',
    'MediaTek',
    'MediaTek Dimensity 1200',
    'Qualcomm Snapdragon 870',
    'Dimensity 8050',
    'MediaTek',
    'HiSilicon Kirin 9000S',
    'Dimensity 7200',
    'Qualcomm Snapdragon 865',
    'HiSilicon Kirin 990 (4G)',
    'Exynos 990',
    'Qualcomm Snapdragon 7 Gen 1',
    'HiSilicon Kirin 990 (5G)',
    'Qualcomm Snapdragon 782G',
    'MediaTek Dimensity 1000 Plus',
    'Qualcomm Snapdragon 7s Gen 2',
    'Exynos 1380',
    'Samsung Exynos 9820',
    'Qualcomm Snapdragon 778G Plus',
    'Qualcomm Snapdragon 780G',
    'Exynos 9825',
    'Qualcomm Snapdragon 855',
    'MediaTek Dimensity 9300',
  ];

  DATA_CHIP_LAPTOP =
    [
      { value: "core-i5", label: "Core i5" },
      { value: "core-i7", label: "Core i7" },
      { value: "core-i3", label: "Core i3" },
      { value: "ryzen-5", label: "Ryzen 5" },
      { value: "ryzen-7", label: "Ryzen 7" },
      { value: "apple-m2", label: "Apple M2" },
      { value: "m3", label: "M3" },
      { value: "apple-m1", label: "Apple M1" },
      { value: "celeron", label: "Celeron" },
      { value: "m3-pro", label: "M3 Pro" },
      { value: "apple-m1-8-core", label: "Apple M1 8-core" },
      { value: "m2", label: "M2" },
      { value: "core-i9", label: "Core i9" },
      { value: "ryzen-3", label: "Ryzen 3" },
    ];

  DATA_BRAND_LT = [
    { value: "gigabyte", label: "Gigabyte" },
    { value: "asus", label: "Asus" },
    { value: "huawei", label: "Huawei" },
    { value: "apple", label: "Apple" },
    { value: "xiaomi", label: "Xiaomi" },
    { value: "hp", label: "HP" },
    { value: "msi", label: "MSI" },
    { value: "acer", label: "Acer" },
    { value: "lenovo", label: "Lenovo" },
    { value: "dell", label: "Dell" },
    { value: "lg", label: "LG" },
    { value: "microsoft", label: "Microsoft" },
    { value: "itel", label: "Itel" },
    // Tiếp tục thêm các hãng sản xuất khác nếu có
  ];

  DATA_RAM = [
    { value: '1', label: '1GB' },
    { value: '2', label: '2GB' },
    { value: '4', label: '4GB' },
    { value: '8', label: '8GB' },
    { value: '16', label: '16GB' },
    { value: '18', label: '18GB' },
    { value: '32', label: '32GB' },
  ];
  // data rom
  rom = DATA_ROM;
  // screen
  dataScreen = DATA_SCREEN
}

