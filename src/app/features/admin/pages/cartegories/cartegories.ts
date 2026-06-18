import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../../model/category.Model';
import { CategoryService } from '../../../../service/category/category.service';

@Component({
  selector: 'app-cartegories',
  imports: [
    CommonModule, TableModule, ButtonModule, CardModule, DialogModule,
    InputTextModule, InputNumberModule, FormsModule,
  ],
  templateUrl: './cartegories.html',
  styleUrl: './cartegories.css',
})
export class Cartegories implements OnInit {
  categories: Category[] = [];
  categoryDialog = false;
  editMode = false;
  selectedCategory: Category = this.emptyCategory();

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  emptyCategory(): Category {
    return { categoryid: 0, categoryname: '', categorykind: 0 };
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => (this.categories = data ?? []),
      error: (err: unknown) => console.error('Error loading categories', err),
    });
  }

  openNew() {
    this.selectedCategory = this.emptyCategory();
    this.editMode = false;
    this.categoryDialog = true;
  }

  editCategory(cat: Category) {
    this.selectedCategory = { ...cat };
    this.editMode = true;
    this.categoryDialog = true;
  }

  deleteCategory(cat: Category) {
    this.categories = this.categories.filter((c) => c.categoryid !== cat.categoryid);
  }

  saveCategory() {
    if (this.editMode) {
      const index = this.categories.findIndex((c) => c.categoryid === this.selectedCategory.categoryid);
      if (index >= 0) {
        this.categories[index] = { ...this.selectedCategory };
      }
    } else {
      this.selectedCategory.categoryid = Date.now();
      this.categories.push({ ...this.selectedCategory });
    }
    this.categoryDialog = false;
  }

  hideDialog() {
    this.categoryDialog = false;
  }
}
